<?php

namespace App\Http\Controllers;

use App\Models\Loop;
use App\Models\LoopExecution;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class WebhookController extends Controller
{
    /**
     * Handle webhook request for a loop.
     */
    public function handle(Request $request, Loop $loop): JsonResponse
    {
        try {
            // Check if loop is active and published
            if (!$loop->is_active || !$loop->is_published) {
                return response()->json([
                    'success' => false,
                    'message' => 'Loop is not active or not published'
                ], 403);
            }

            // Create execution record
            $execution = LoopExecution::create([
                'loop_id' => $loop->id,
                'trigger_data' => $request->all(),
                'status' => 'pending',
                'started_at' => now()
            ]);

            // Log the webhook request
            Log::info('Webhook received for loop: ' . $loop->id, [
                'execution_id' => $execution->id,
                'data' => $request->all()
            ]);

            // Here you would typically queue the loop execution
            // For now, we'll just mark it as completed
            $execution->update([
                'status' => 'completed',
                'completed_at' => now(),
                'result' => ['message' => 'Webhook processed successfully']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Webhook processed successfully',
                'execution_id' => $execution->id
            ]);

        } catch (\Exception $e) {
            Log::error('Webhook processing error: ' . $e->getMessage(), [
                'loop_id' => $loop->id,
                'data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to process webhook'
            ], 500);
        }
    }

    /**
     * Handle webhook request with token verification.
     */
    public function handleWithToken(Request $request, Loop $loop, string $token): JsonResponse
    {
        try {
            // Verify the token
            $webhookSecret = config('app.webhook_secret', env('LOOPS_WEBHOOK_SECRET'));
            
            if (!$webhookSecret || !Hash::check($token, $webhookSecret)) {
                Log::warning('Invalid webhook token for loop: ' . $loop->id, [
                    'provided_token' => $token,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Invalid token'
                ], 401);
            }

            // Process the webhook using the same logic as handle method
            return $this->handle($request, $loop);

        } catch (\Exception $e) {
            Log::error('Webhook token verification error: ' . $e->getMessage(), [
                'loop_id' => $loop->id,
                'token' => $token
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to verify token'
            ], 500);
        }
    }
}
