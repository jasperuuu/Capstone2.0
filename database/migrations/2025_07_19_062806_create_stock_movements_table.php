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
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->string('reference_type'); // raw_material, product
            $table->unsignedBigInteger('reference_id');
            $table->enum('movement_type', ['in', 'out', 'adjustment', 'transfer']);
            $table->enum('transaction_type', ['purchase', 'production', 'sale', 'waste', 'adjustment', 'return']);
            $table->decimal('quantity', 8, 2);
            $table->string('unit_of_measure');
            $table->decimal('unit_cost', 8, 2)->nullable();
            $table->decimal('total_value', 10, 2)->nullable();
            $table->date('movement_date');
            $table->string('reference_number')->nullable();
            $table->text('notes')->nullable();
            $table->string('created_by')->nullable();
            $table->timestamps();
            
            $table->index(['reference_type', 'reference_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};