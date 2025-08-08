<?php
// Ganti Isi File: app/Models/BeritaAcara.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BeritaAcara extends Model
{
    use HasFactory;

    protected $fillable = [
        'kegiatan_id',
        'nama_berita_acara', // Tambahkan ini
        'nomor_berita_acara',
        'tanggal_berita_acara',
        'dokumen_path',
    ];

    public function kegiatan(): BelongsTo
    {
        return $this->belongsTo(Kegiatan::class);
    }
}