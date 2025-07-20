<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\LoopController;
use App\Http\Controllers\LoopBlockController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index']);
    
    // Loops
    Route::apiResource('loops', LoopController::class);
    Route::post('loops/{loop}/execute', [LoopController::class, 'execute']);
    Route::post('loops/{loop}/duplicate', [LoopController::class, 'duplicate']);
    Route::patch('loops/{loop}/toggle', [LoopController::class, 'toggle']);
    Route::patch('loops/{loop}/publish', [LoopController::class, 'publish']);
    Route::get('loops/{loop}/executions', [LoopController::class, 'executions']);
    
    // Loop Blocks
    Route::apiResource('loops.blocks', LoopBlockController::class)->except(['index', 'show']);
    Route::get('loops/{loop}/blocks', [LoopBlockController::class, 'index']);
    Route::get('blocks/{block}', [LoopBlockController::class, 'show']);
    Route::post('blocks/{block}/execute', [LoopBlockController::class, 'execute']);
    Route::patch('loops/{loop}/blocks/reorder', [LoopBlockController::class, 'reorder']);
});

// Public routes
Route::get('explore', [LoopController::class, 'explore']); // Public loops
Route::get('templates', [LoopController::class, 'templates']); // Loop templates

// Webhook routes (public)
Route::post('webhooks/{loop:id}', [WebhookController::class, 'handle']);
Route::post('webhooks/{loop:id}/{token}', [WebhookController::class, 'handleWithToken']);

// Health check
Route::get('health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
});