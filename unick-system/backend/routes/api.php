<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\InventoryController;
use App\Http\Controllers\API\ProductionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes (for customer ordering system)
Route::prefix('public')->group(function () {
    Route::get('products', [ProductController::class, 'publicIndex']);
    Route::get('products/{id}', [ProductController::class, 'publicShow']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::post('customers', [CustomerController::class, 'store']);
    Route::get('orders/{orderNumber}/track', [OrderController::class, 'track']);
});

// Protected routes (for admin/staff)
Route::middleware('auth:sanctum')->group(function () {
    
    // Products Management
    Route::apiResource('products', ProductController::class);
    Route::get('products/{id}/materials', [ProductController::class, 'getMaterials']);
    Route::post('products/{id}/materials', [ProductController::class, 'addMaterial']);
    
    // Orders Management
    Route::apiResource('orders', OrderController::class);
    Route::patch('orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::get('orders/{id}/production', [OrderController::class, 'getProductionStatus']);
    
    // Customers Management
    Route::apiResource('customers', CustomerController::class);
    Route::get('customers/{id}/orders', [CustomerController::class, 'getOrders']);
    
    // Inventory Management
    Route::get('inventory', [InventoryController::class, 'index']);
    Route::get('inventory/products', [InventoryController::class, 'products']);
    Route::get('inventory/materials', [InventoryController::class, 'materials']);
    Route::get('inventory/low-stock', [InventoryController::class, 'lowStock']);
    Route::post('inventory/adjust', [InventoryController::class, 'adjustStock']);
    Route::get('inventory/movements', [InventoryController::class, 'movements']);
    
    // Production Management
    Route::get('production/orders', [ProductionController::class, 'orders']);
    Route::post('production/orders', [ProductionController::class, 'createProductionOrder']);
    Route::patch('production/orders/{id}/status', [ProductionController::class, 'updateStatus']);
    Route::patch('production/orders/{id}/progress', [ProductionController::class, 'updateProgress']);
    Route::get('production/dashboard', [ProductionController::class, 'dashboard']);
    Route::get('production/schedule', [ProductionController::class, 'schedule']);
    
    // Reports
    Route::prefix('reports')->group(function () {
        Route::get('sales', [OrderController::class, 'salesReport']);
        Route::get('production', [ProductionController::class, 'productionReport']);
        Route::get('inventory', [InventoryController::class, 'inventoryReport']);
        Route::get('materials-usage', [InventoryController::class, 'materialsUsageReport']);
    });
    
    // MRP (Material Requirements Planning)
    Route::prefix('mrp')->group(function () {
        Route::get('requirements', [InventoryController::class, 'materialRequirements']);
        Route::get('forecast', [InventoryController::class, 'demandForecast']);
        Route::post('purchase-suggestions', [InventoryController::class, 'purchaseSuggestions']);
    });
});