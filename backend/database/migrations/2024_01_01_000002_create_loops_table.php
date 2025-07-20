<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('workflow_data')->nullable();
            $table->enum('trigger_type', ['manual', 'webhook', 'schedule', 'email'])->default('manual');
            $table->json('trigger_config')->nullable();
            $table->boolean('is_active')->default(false);
            $table->boolean('is_published')->default(false);
            $table->integer('execution_count')->default(0);
            $table->timestamp('last_executed_at')->nullable();
            $table->json('tags')->nullable();
            $table->string('category', 100)->default('general');
            $table->timestamps();
            
            $table->index(['user_id', 'is_active']);
            $table->index(['user_id', 'is_published']);
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loops');
    }
};