<?php
// Ganti Isi File: database/migrations/2025_07_05_104707_create_berita_acaras_table.php

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
        Schema::create('berita_acaras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kegiatan_id')->constrained()->onDelete('cascade');
            // Menambahkan kolom nama_berita_acara
            $table->string('nama_berita_acara');
            $table->string('nomor_berita_acara');
            $table->date('tanggal_berita_acara');
            $table->string('dokumen_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berita_acaras');
    }
};