<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoopExecution extends Model
{
    use HasFactory;

    protected $fillable = [
        'loop_id',
        'status',
        'input_data',
        'output_data',
        'error_message',
        'execution_time_ms',
        'started_at',
        'completed_at',
        'triggered_by',
        'execution_log'
    ];

    protected $casts = [
        'input_data' => 'array',
        'output_data' => 'array',
        'execution_log' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'execution_time_ms' => 'integer'
    ];

    public function loop(): BelongsTo
    {
        return $this->belongsTo(Loop::class);
    }

    public function getStatusBadgeAttribute(): string
    {
        return match($this->status) {
            'pending' => 'badge-warning',
            'running' => 'badge-primary',
            'completed' => 'badge-success',
            'failed' => 'badge-danger',
            'cancelled' => 'badge-secondary',
            default => 'badge-light'
        };
    }

    public function getDurationAttribute(): ?string
    {
        if ($this->execution_time_ms) {
            if ($this->execution_time_ms < 1000) {
                return $this->execution_time_ms . 'ms';
            } elseif ($this->execution_time_ms < 60000) {
                return round($this->execution_time_ms / 1000, 2) . 's';
            } else {
                return round($this->execution_time_ms / 60000, 2) . 'min';
            }
        }

        if ($this->started_at && $this->completed_at) {
            return $this->started_at->diffForHumans($this->completed_at, true);
        }

        return null;
    }

    public function markAsRunning(): void
    {
        $this->update([
            'status' => 'running',
            'started_at' => now()
        ]);
    }

    public function markAsCompleted(array $outputData = []): void
    {
        $completedAt = now();
        $executionTime = $this->started_at 
            ? $this->started_at->diffInMilliseconds($completedAt)
            : null;

        $this->update([
            'status' => 'completed',
            'output_data' => $outputData,
            'completed_at' => $completedAt,
            'execution_time_ms' => $executionTime
        ]);
    }

    public function markAsFailed(string $errorMessage): void
    {
        $completedAt = now();
        $executionTime = $this->started_at 
            ? $this->started_at->diffInMilliseconds($completedAt)
            : null;

        $this->update([
            'status' => 'failed',
            'error_message' => $errorMessage,
            'completed_at' => $completedAt,
            'execution_time_ms' => $executionTime
        ]);
    }
}