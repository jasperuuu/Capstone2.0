<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loop_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loop_id')->constrained()->onDelete('cascade');
            $table->string('type'); // llm, code, webhook, email, sms, http, condition, loop, delay, etc.
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('config'); // Block-specific configuration
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('x_position')->nullable();
            $table->integer('y_position')->nullable();
            $table->timestamps();
            
            $table->index(['loop_id', 'order']);
            $table->index('type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loop_blocks');
    }
};