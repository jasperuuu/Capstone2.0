<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        // Get recent orders
        $recentOrders = Order::with(['customer', 'items.product'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get recent customers
        $recentCustomers = Customer::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Calculate business statistics
        $totalOrders = Order::count();
        $totalCustomers = Customer::count();
        $totalProducts = Product::count();
        $totalRevenue = Order::where('status', 'completed')->sum('total_amount');

        // Get order stats for the last 7 days
        $orderStats = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = Order::whereDate('created_at', $date)->count();
            $revenue = Order::whereDate('created_at', $date)
                ->where('status', 'completed')
                ->sum('total_amount');
            
            $orderStats[] = [
                'date' => $date->format('Y-m-d'),
                'orders' => $count,
                'revenue' => $revenue
            ];
        }

        // Get order status breakdown
        $statusStats = Order::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        return response()->json([
            'stats' => [
                'total_orders' => $totalOrders,
                'total_customers' => $totalCustomers,
                'total_products' => $totalProducts,
                'total_revenue' => $totalRevenue,
                'pending_orders' => Order::where('status', 'pending')->count(),
                'completed_orders' => Order::where('status', 'completed')->count()
            ],
            'recent_orders' => $recentOrders,
            'recent_customers' => $recentCustomers,
            'order_stats' => $orderStats,
            'status_stats' => $statusStats
        ]);
    }
}