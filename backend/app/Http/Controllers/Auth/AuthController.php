<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'plan' => 'free',
            'credits_used' => 0,
            'credits_limit' => 8000,
            'api_key' => Str::random(32)
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Load additional user statistics
        $user->load(['loops' => function ($query) {
            $query->select('id', 'user_id', 'is_active', 'is_published', 'execution_count');
        }]);

        $stats = [
            'total_loops' => $user->loops->count(),
            'active_loops' => $user->loops->where('is_active', true)->count(),
            'published_loops' => $user->loops->where('is_published', true)->count(),
            'total_executions' => $user->loops->sum('execution_count'),
            'credits_remaining' => max(0, $user->credits_limit - $user->credits_used),
            'credits_percentage' => $user->credits_limit > 0 
                ? round(($user->credits_used / $user->credits_limit) * 100, 1)
                : 0
        ];

        return response()->json([
            'user' => $user->makeHidden(['loops']),
            'stats' => $stats
        ]);
    }
}