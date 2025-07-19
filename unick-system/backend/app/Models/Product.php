<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'sku',
        'name',
        'description',
        'category',
        'price',
        'production_time_hours',
        'dimensions',
        'wood_type',
        'finish',
        'images',
        'status'
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2'
    ];

    // Relationships
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function inventory()
    {
        return $this->hasOne(Inventory::class);
    }

    public function materials()
    {
        return $this->belongsToMany(RawMaterial::class, 'product_materials')
                    ->withPivot('quantity_required', 'unit_of_measure', 'notes')
                    ->withTimestamps();
    }

    public function productMaterials()
    {
        return $this->hasMany(ProductMaterial::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
