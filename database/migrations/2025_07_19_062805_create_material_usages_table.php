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
        Schema::create('material_usages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_order_id')->constrained()->onDelete('cascade');
            $table->foreignId('raw_material_id')->constrained()->onDelete('cascade');
            $table->decimal('quantity_used', 8, 2);
            $table->string('unit_of_measure');
            $table->decimal('unit_cost', 8, 2);
            $table->decimal('total_cost', 10, 2);
            $table->date('usage_date');
            $table->string('used_by')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_usages');
    }
};