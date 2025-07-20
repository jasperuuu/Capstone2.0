<?php

namespace App\Http\Controllers;

use App\Models\Loop;
use App\Models\LoopExecution;
use App\Services\LoopExecutionService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoopController extends Controller
{
    protected LoopExecutionService $executionService;

    public function __construct(LoopExecutionService $executionService)
    {
        $this->executionService = $executionService;
    }

    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        $loops = $user->loops()
            ->with(['executions' => function ($query) {
                $query->latest()->limit(5);
            }])
            ->when($request->category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->orderBy($request->sort ?? 'updated_at', $request->direction ?? 'desc')
            ->paginate($request->per_page ?? 12);

        return response()->json($loops);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:100',
            'trigger_type' => 'required|in:manual,webhook,schedule,email',
            'trigger_config' => 'nullable|array',
            'workflow_data' => 'nullable|array',
            'tags' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();

        if (!$user->canCreateLoop()) {
            return response()->json([
                'message' => 'Loop creation limit reached for your plan'
            ], 403);
        }

        $loop = $user->loops()->create([
            'name' => $request->name,
            'description' => $request->description,
            'category' => $request->category ?? 'general',
            'trigger_type' => $request->trigger_type,
            'trigger_config' => $request->trigger_config ?? [],
            'workflow_data' => $request->workflow_data ?? [],
            'tags' => $request->tags ?? [],
            'is_active' => false,
            'is_published' => false
        ]);

        return response()->json($loop->load('blocks'), 201);
    }

    public function show(Loop $loop): JsonResponse
    {
        $this->authorize('view', $loop);

        return response()->json($loop->load(['blocks', 'executions' => function ($query) {
            $query->latest()->limit(10);
        }]));
    }

    public function update(Request $request, Loop $loop): JsonResponse
    {
        $this->authorize('update', $loop);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:100',
            'trigger_type' => 'sometimes|in:manual,webhook,schedule,email',
            'trigger_config' => 'nullable|array',
            'workflow_data' => 'nullable|array',
            'tags' => 'nullable|array',
            'is_active' => 'sometimes|boolean',
            'is_published' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $loop->update($request->validated());

        return response()->json($loop->load('blocks'));
    }

    public function destroy(Loop $loop): JsonResponse
    {
        $this->authorize('delete', $loop);

        // Cancel any running executions
        $loop->executions()->where('status', 'running')->update(['status' => 'cancelled']);

        $loop->delete();

        return response()->json(['message' => 'Loop deleted successfully']);
    }

    public function execute(Request $request, Loop $loop): JsonResponse
    {
        $this->authorize('execute', $loop);

        if (!$loop->canExecute()) {
            return response()->json([
                'message' => 'Loop cannot be executed. Check if it\'s active and has blocks.'
            ], 400);
        }

        if (!Auth::user()->hasCreditsRemaining()) {
            return response()->json([
                'message' => 'Insufficient credits to execute loop'
            ], 402);
        }

        $inputData = $request->input('data', []);
        
        $execution = $this->executionService->execute($loop, $inputData, 'manual');

        return response()->json($execution);
    }

    public function duplicate(Loop $loop): JsonResponse
    {
        $this->authorize('view', $loop);

        $user = Auth::user();

        if (!$user->canCreateLoop()) {
            return response()->json([
                'message' => 'Loop creation limit reached for your plan'
            ], 403);
        }

        $newLoop = $user->loops()->create([
            'name' => $loop->name . ' (Copy)',
            'description' => $loop->description,
            'category' => $loop->category,
            'trigger_type' => $loop->trigger_type,
            'trigger_config' => $loop->trigger_config,
            'workflow_data' => $loop->workflow_data,
            'tags' => $loop->tags,
            'is_active' => false,
            'is_published' => false
        ]);

        // Duplicate blocks
        foreach ($loop->blocks as $block) {
            $newLoop->blocks()->create([
                'type' => $block->type,
                'name' => $block->name,
                'description' => $block->description,
                'config' => $block->config,
                'order' => $block->order,
                'is_active' => $block->is_active,
                'x_position' => $block->x_position,
                'y_position' => $block->y_position
            ]);
        }

        return response()->json($newLoop->load('blocks'), 201);
    }

    public function toggle(Loop $loop): JsonResponse
    {
        $this->authorize('update', $loop);

        $loop->update(['is_active' => !$loop->is_active]);

        return response()->json([
            'message' => $loop->is_active ? 'Loop activated' : 'Loop deactivated',
            'is_active' => $loop->is_active
        ]);
    }

    public function publish(Loop $loop): JsonResponse
    {
        $this->authorize('update', $loop);

        if (!$loop->canExecute()) {
            return response()->json([
                'message' => 'Cannot publish loop without blocks'
            ], 400);
        }

        $loop->update(['is_published' => !$loop->is_published]);

        return response()->json([
            'message' => $loop->is_published ? 'Loop published' : 'Loop unpublished',
            'is_published' => $loop->is_published
        ]);
    }

    public function executions(Loop $loop): JsonResponse
    {
        $this->authorize('view', $loop);

        $executions = $loop->executions()
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($executions);
    }
}