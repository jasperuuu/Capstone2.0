<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        // Get recent loops
        $recentLoops = $user->loops()
            ->with(['executions' => function ($query) {
                $query->latest()->limit(1);
            }])
            ->orderBy('updated_at', 'desc')
            ->limit(5)
            ->get();

        // Get recent executions
        $recentExecutions = $user->loops()
            ->join('loop_executions', 'loops.id', '=', 'loop_executions.loop_id')
            ->select('loop_executions.*', 'loops.name as loop_name')
            ->orderBy('loop_executions.created_at', 'desc')
            ->limit(10)
            ->get();

        // Calculate statistics
        $totalLoops = $user->loops()->count();
        $activeLoops = $user->loops()->where('is_active', true)->count();
        $totalExecutions = $user->loops()->sum('execution_count');
        $successfulExecutions = $user->loops()
            ->join('loop_executions', 'loops.id', '=', 'loop_executions.loop_id')
            ->where('loop_executions.status', 'completed')
            ->count();

        $successRate = $totalExecutions > 0 
            ? round(($successfulExecutions / $totalExecutions) * 100, 1)
            : 0;

        // Get execution stats for the last 7 days
        $executionStats = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = $user->loops()
                ->join('loop_executions', 'loops.id', '=', 'loop_executions.loop_id')
                ->whereDate('loop_executions.created_at', $date)
                ->count();
            
            $executionStats[] = [
                'date' => $date->format('Y-m-d'),
                'executions' => $count
            ];
        }

        // Get category breakdown
        $categoryStats = $user->loops()
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->pluck('count', 'category')
            ->toArray();

        return response()->json([
            'stats' => [
                'total_loops' => $totalLoops,
                'active_loops' => $activeLoops,
                'total_executions' => $totalExecutions,
                'success_rate' => $successRate,
                'credits_used' => $user->credits_used,
                'credits_limit' => $user->credits_limit,
                'credits_remaining' => max(0, $user->credits_limit - $user->credits_used)
            ],
            'recent_loops' => $recentLoops,
            'recent_executions' => $recentExecutions,
            'execution_stats' => $executionStats,
            'category_stats' => $categoryStats
        ]);
    }
}