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
        Schema::create('raw_materials', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('type', ['wood', 'hardware', 'finish', 'adhesive', 'other']);
            $table->string('unit_of_measure'); // board feet, pieces, liters, etc.
            $table->decimal('unit_cost', 8, 2);
            $table->integer('current_stock')->default(0);
            $table->integer('minimum_stock')->default(0);
            $table->integer('reorder_quantity')->default(0);
            $table->string('supplier')->nullable();
            $table->integer('lead_time_days')->default(7);
            $table->enum('status', ['active', 'inactive', 'discontinued'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raw_materials');
    }
};
