<?php
// Ganti Isi File: database/migrations/2025_07_05_104639_create_proposals_table.php

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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // Menyederhanakan kolom sesuai permintaan
            $table->string('nama_proposal');
            $table->date('tanggal_proposal');
            $table->string('file_path');
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->text('catatan_revisi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
