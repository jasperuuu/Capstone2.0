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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('name');
            $table->text('description');
            $table->enum('category', ['chairs', 'tables', 'cabinets', 'shelves', 'custom']);
            $table->decimal('price', 10, 2);
            $table->integer('production_time_hours');
            $table->string('dimensions');
            $table->string('wood_type');
            $table->string('finish');
            $table->json('images')->nullable();
            $table->enum('status', ['active', 'inactive', 'discontinued'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
