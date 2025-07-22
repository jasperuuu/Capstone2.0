<?php

namespace App\Http\Controllers;

use App\Models\Loop;
use App\Models\LoopBlock;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class LoopBlockController extends Controller
{
    /**
     * Display a listing of the blocks for a specific loop.
     */
    public function index(Loop $loop): JsonResponse
    {
        $blocks = $loop->blocks()
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $blocks
        ]);
    }

    /**
     * Store a newly created block in storage.
     */
    public function store(Request $request, Loop $loop): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:trigger,action,condition,loop,delay',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'config' => 'required|array',
            'order' => 'nullable|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // If no order specified, add to end
            if (!$request->has('order')) {
                $maxOrder = $loop->blocks()->max('order') ?? -1;
                $request->merge(['order' => $maxOrder + 1]);
            }

            $block = $loop->blocks()->create([
                'type' => $request->type,
                'name' => $request->name,
                'description' => $request->description,
                'config' => $request->config,
                'order' => $request->order,
                'is_enabled' => $request->get('is_enabled', true)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Block created successfully',
                'data' => $block
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating loop block: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create block'
            ], 500);
        }
    }

    /**
     * Display the specified block.
     */
    public function show(LoopBlock $block): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $block
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loop $loop, LoopBlock $block): JsonResponse
    {
        // Ensure block belongs to the loop
        if ($block->loop_id !== $loop->id) {
            return response()->json([
                'success' => false,
                'message' => 'Block does not belong to this loop'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|required|string|in:trigger,action,condition,loop,delay',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'config' => 'sometimes|required|array',
            'order' => 'nullable|integer|min:0',
            'is_enabled' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $block->update($request->only([
                'type', 'name', 'description', 'config', 'order', 'is_enabled'
            ]));

            return response()->json([
                'success' => true,
                'message' => 'Block updated successfully',
                'data' => $block
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating loop block: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update block'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loop $loop, LoopBlock $block): JsonResponse
    {
        // Ensure block belongs to the loop
        if ($block->loop_id !== $loop->id) {
            return response()->json([
                'success' => false,
                'message' => 'Block does not belong to this loop'
            ], 403);
        }

        try {
            $block->delete();

            return response()->json([
                'success' => true,
                'message' => 'Block deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting loop block: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete block'
            ], 500);
        }
    }

    /**
     * Execute a specific block.
     */
    public function execute(Request $request, LoopBlock $block): JsonResponse
    {
        try {
            // This would contain the actual block execution logic
            // For now, return a placeholder response
            
            return response()->json([
                'success' => true,
                'message' => 'Block executed successfully',
                'data' => [
                    'block_id' => $block->id,
                    'status' => 'completed',
                    'executed_at' => now()->toISOString()
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error executing loop block: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to execute block'
            ], 500);
        }
    }

    /**
     * Reorder blocks within a loop.
     */
    public function reorder(Request $request, Loop $loop): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'blocks' => 'required|array',
            'blocks.*.id' => 'required|integer|exists:loop_blocks,id',
            'blocks.*.order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            foreach ($request->blocks as $blockData) {
                $block = LoopBlock::findOrFail($blockData['id']);
                
                // Ensure block belongs to the loop
                if ($block->loop_id !== $loop->id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'One or more blocks do not belong to this loop'
                    ], 403);
                }
                
                $block->update(['order' => $blockData['order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Blocks reordered successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error reordering loop blocks: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder blocks'
            ], 500);
        }
    }
}
