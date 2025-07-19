<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductMaterial;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    /**
     * Display a listing of products for admin
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['inventory']);
        
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('sku', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        
        $products = $query->paginate($request->get('per_page', 15));
        
        return response()->json($products);
    }

    /**
     * Display a listing of active products for public (customer ordering)
     */
    public function publicIndex(Request $request): JsonResponse
    {
        $query = Product::active()->with(['inventory']);
        
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }
        
        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        
        $products = $query->paginate($request->get('per_page', 12));
        
        return response()->json($products);
    }

    /**
     * Store a newly created product
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'sku' => 'required|string|unique:products',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:chairs,tables,cabinets,shelves,custom',
            'price' => 'required|numeric|min:0',
            'production_time_hours' => 'required|integer|min:1',
            'dimensions' => 'required|string',
            'wood_type' => 'required|string',
            'finish' => 'required|string',
            'images' => 'nullable|array',
            'status' => 'in:active,inactive,discontinued'
        ]);

        $product = Product::create($request->all());
        
        // Create inventory record
        $product->inventory()->create([
            'quantity_on_hand' => 0,
            'quantity_reserved' => 0,
            'quantity_available' => 0,
            'minimum_stock_level' => 0,
            'maximum_stock_level' => 100
        ]);

        return response()->json($product->load('inventory'), 201);
    }

    /**
     * Display the specified product
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json($product->load(['inventory', 'materials']));
    }

    /**
     * Display the specified product for public
     */
    public function publicShow($id): JsonResponse
    {
        $product = Product::active()->with(['inventory'])->findOrFail($id);
        return response()->json($product);
    }

    /**
     * Update the specified product
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        $request->validate([
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:chairs,tables,cabinets,shelves,custom',
            'price' => 'required|numeric|min:0',
            'production_time_hours' => 'required|integer|min:1',
            'dimensions' => 'required|string',
            'wood_type' => 'required|string',
            'finish' => 'required|string',
            'images' => 'nullable|array',
            'status' => 'in:active,inactive,discontinued'
        ]);

        $product->update($request->all());

        return response()->json($product->load(['inventory', 'materials']));
    }

    /**
     * Remove the specified product
     */
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    /**
     * Get materials for a product
     */
    public function getMaterials(Product $product): JsonResponse
    {
        $materials = $product->materials()->with('pivot')->get();
        return response()->json($materials);
    }

    /**
     * Add material to product (BOM)
     */
    public function addMaterial(Request $request, Product $product): JsonResponse
    {
        $request->validate([
            'raw_material_id' => 'required|exists:raw_materials,id',
            'quantity_required' => 'required|numeric|min:0',
            'unit_of_measure' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        $product->materials()->attach($request->raw_material_id, [
            'quantity_required' => $request->quantity_required,
            'unit_of_measure' => $request->unit_of_measure,
            'notes' => $request->notes
        ]);

        return response()->json(['message' => 'Material added to product successfully']);
    }
}
