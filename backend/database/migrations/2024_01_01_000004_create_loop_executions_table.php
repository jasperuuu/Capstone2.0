<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loop_executions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loop_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['pending', 'running', 'completed', 'failed', 'cancelled'])->default('pending');
            $table->json('input_data')->nullable();
            $table->json('output_data')->nullable();
            $table->text('error_message')->nullable();
            $table->integer('execution_time_ms')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->string('triggered_by')->default('manual'); // manual, webhook, schedule, etc.
            $table->json('execution_log')->nullable();
            $table->timestamps();
            
            $table->index(['loop_id', 'status']);
            $table->index(['loop_id', 'created_at']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loop_executions');
    }
};