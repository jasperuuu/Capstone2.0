<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Loop extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'workflow_data',
        'trigger_type',
        'trigger_config',
        'is_active',
        'is_published',
        'execution_count',
        'last_executed_at',
        'tags',
        'category'
    ];

    protected $casts = [
        'workflow_data' => 'array',
        'trigger_config' => 'array',
        'is_active' => 'boolean',
        'is_published' => 'boolean',
        'last_executed_at' => 'datetime',
        'tags' => 'array'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function executions(): HasMany
    {
        return $this->hasMany(LoopExecution::class);
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(LoopBlock::class)->orderBy('order');
    }

    public function getStatusAttribute(): string
    {
        if (!$this->is_active) {
            return 'inactive';
        }
        
        if ($this->executions()->where('status', 'running')->exists()) {
            return 'running';
        }

        return 'active';
    }

    public function canExecute(): bool
    {
        return $this->is_active && $this->blocks()->count() > 0;
    }
}