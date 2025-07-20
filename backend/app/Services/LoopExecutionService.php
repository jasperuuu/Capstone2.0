<?php

namespace App\Services;

use App\Models\Loop;
use App\Models\LoopExecution;
use Illuminate\Support\Facades\Log;
use Exception;

class LoopExecutionService
{
    public function execute(Loop $loop, array $inputData = [], string $triggeredBy = 'manual'): LoopExecution
    {
        $execution = $loop->executions()->create([
            'status' => 'pending',
            'input_data' => $inputData,
            'triggered_by' => $triggeredBy,
            'execution_log' => []
        ]);

        try {
            $execution->markAsRunning();
            $this->logExecution($execution, 'info', 'Loop execution started');

            $context = $inputData;
            $executionLog = [];

            // Execute each block in order
            foreach ($loop->blocks()->where('is_active', true)->orderBy('order')->get() as $block) {
                $this->logExecution($execution, 'info', "Executing block: {$block->name} ({$block->type})");

                $startTime = microtime(true);
                $blockResult = $block->execute($context);
                $executionTime = round((microtime(true) - $startTime) * 1000, 2);

                $executionLog[] = [
                    'block_id' => $block->id,
                    'block_name' => $block->name,
                    'block_type' => $block->type,
                    'execution_time_ms' => $executionTime,
                    'success' => $blockResult['success'],
                    'data' => $blockResult['data'] ?? null,
                    'error' => $blockResult['error'] ?? null,
                    'timestamp' => now()->toISOString()
                ];

                if (!$blockResult['success']) {
                    throw new Exception($blockResult['error'] ?? 'Block execution failed');
                }

                // Update context with block output
                $context = array_merge($context, $blockResult['data'] ?? []);

                $this->logExecution($execution, 'info', "Block completed in {$executionTime}ms");
            }

            $execution->update(['execution_log' => $executionLog]);
            $execution->markAsCompleted($context);
            
            // Increment loop execution count
            $loop->increment('execution_count');
            $loop->update(['last_executed_at' => now()]);

            $this->logExecution($execution, 'info', 'Loop execution completed successfully');

            // Deduct credits from user
            $loop->user->deductCredits(1);

        } catch (Exception $e) {
            $this->logExecution($execution, 'error', $e->getMessage());
            $execution->markAsFailed($e->getMessage());
            
            Log::error('Loop execution failed', [
                'loop_id' => $loop->id,
                'execution_id' => $execution->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        return $execution->fresh();
    }

    public function executeBlock(LoopExecution $execution, $blockId): array
    {
        $loop = $execution->loop;
        $block = $loop->blocks()->find($blockId);

        if (!$block) {
            return ['success' => false, 'error' => 'Block not found'];
        }

        try {
            $this->logExecution($execution, 'info', "Executing single block: {$block->name}");
            
            $context = $execution->input_data ?? [];
            $result = $block->execute($context);

            $this->logExecution($execution, 'info', "Block execution result: " . json_encode($result));

            return $result;
        } catch (Exception $e) {
            $this->logExecution($execution, 'error', "Block execution error: " . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function cancelExecution(LoopExecution $execution): bool
    {
        if ($execution->status !== 'running') {
            return false;
        }

        $execution->update([
            'status' => 'cancelled',
            'completed_at' => now(),
            'execution_time_ms' => $execution->started_at 
                ? $execution->started_at->diffInMilliseconds(now())
                : null
        ]);

        $this->logExecution($execution, 'info', 'Loop execution cancelled');

        return true;
    }

    private function logExecution(LoopExecution $execution, string $level, string $message): void
    {
        $log = $execution->execution_log ?? [];
        $log[] = [
            'level' => $level,
            'message' => $message,
            'timestamp' => now()->toISOString()
        ];

        $execution->update(['execution_log' => $log]);

        // Also log to Laravel log
        Log::{$level}("Loop {$execution->loop_id} Execution {$execution->id}: {$message}");
    }

    public function getExecutionStats(Loop $loop): array
    {
        $executions = $loop->executions();

        return [
            'total_executions' => $executions->count(),
            'successful_executions' => $executions->where('status', 'completed')->count(),
            'failed_executions' => $executions->where('status', 'failed')->count(),
            'average_execution_time' => $executions->where('status', 'completed')
                ->avg('execution_time_ms'),
            'last_execution' => $executions->latest()->first(),
            'success_rate' => $executions->count() > 0 
                ? round(($executions->where('status', 'completed')->count() / $executions->count()) * 100, 2)
                : 0
        ];
    }
}