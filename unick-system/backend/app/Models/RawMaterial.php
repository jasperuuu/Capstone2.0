<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'sku',
        'name',
        'description',
        'type',
        'unit_of_measure',
        'unit_cost',
        'current_stock',
        'minimum_stock',
        'reorder_quantity',
        'supplier',
        'lead_time_days',
        'status'
    ];

    protected $casts = [
        'unit_cost' => 'decimal:2'
    ];

    // Relationships
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_materials')
                    ->withPivot('quantity_required', 'unit_of_measure', 'notes')
                    ->withTimestamps();
    }

    public function materialUsages()
    {
        return $this->hasMany(MaterialUsage::class);
    }

    public function stockMovements()
    {
        return $this->morphMany(StockMovement::class, 'reference');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeLowStock($query)
    {
        return $query->whereRaw('current_stock <= minimum_stock');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Methods
    public function needsReorder()
    {
        return $this->current_stock <= $this->minimum_stock;
    }

    public function getAvailableStock()
    {
        return $this->current_stock;
    }
}
