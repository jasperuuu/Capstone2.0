<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_url',
        'plan',
        'credits_used',
        'credits_limit',
        'api_key'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'api_key'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'credits_used' => 'integer',
        'credits_limit' => 'integer'
    ];

    public function loops(): HasMany
    {
        return $this->hasMany(Loop::class);
    }

    public function executions(): HasMany
    {
        return $this->hasMany(LoopExecution::class, 'loop_id', 'id')
                   ->join('loops', 'loop_executions.loop_id', '=', 'loops.id')
                   ->where('loops.user_id', $this->id);
    }

    public function getActiveLoopsCountAttribute(): int
    {
        return $this->loops()->where('is_active', true)->count();
    }

    public function getPublishedLoopsCountAttribute(): int
    {
        return $this->loops()->where('is_published', true)->count();
    }

    public function getTotalExecutionsAttribute(): int
    {
        return $this->loops()->sum('execution_count');
    }

    public function canCreateLoop(): bool
    {
        return match($this->plan) {
            'free' => $this->loops()->count() < 5,
            'pro' => $this->loops()->count() < 50,
            'enterprise' => true,
            default => false
        };
    }

    public function hasCreditsRemaining(): bool
    {
        return $this->credits_used < $this->credits_limit;
    }

    public function deductCredits(int $amount): bool
    {
        if ($this->credits_used + $amount > $this->credits_limit) {
            return false;
        }

        $this->increment('credits_used', $amount);
        return true;
    }

    public function resetCredits(): void
    {
        $this->update(['credits_used' => 0]);
    }
}
