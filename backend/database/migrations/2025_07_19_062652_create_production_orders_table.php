<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('production_orders', function (Blueprint $table) {
            $table->id();
            $table->string('production_order_number')->unique();
            $table->foreignId('order_item_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'on_hold', 'cancelled'])->default('scheduled');
            $table->date('scheduled_start_date');
            $table->date('actual_start_date')->nullable();
            $table->date('scheduled_completion_date');
            $table->date('actual_completion_date')->nullable();
            $table->integer('estimated_hours');
            $table->integer('actual_hours')->nullable();
            $table->string('assigned_worker')->nullable();
            $table->text('notes')->nullable();
            $table->integer('progress_percentage')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_orders');
    }
};
