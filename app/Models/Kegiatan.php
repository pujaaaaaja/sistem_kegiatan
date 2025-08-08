<?php
// Ganti Isi File: app/Models/Kegiatan.php

namespace App\Models;

use App\Enums\TahapanKegiatan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Kegiatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'proposal_id',
        'tim_id',
        'created_by', // <-- INI YANG PALING PENTING UNTUK DITAMBAHKAN
        'nama_kegiatan',
        'ket_kegiatan',
        'tanggal_kegiatan',
        'sktl_path',
        'tanggal_penyerahan',     // Dari migrasi kedua
        'sktl_penyerahan_path', // Dari migrasi kedua
    ];

    protected $casts = [
        'tahapan' => TahapanKegiatan::class,
    ];

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }

    public function tim(): BelongsTo
    {
        return $this->belongsTo(Tim::class);
    }

    public function dokumentasi(): HasMany
    {
        return $this->hasMany(DokumentasiKegiatan::class);
    }

    public function kebutuhan(): HasMany
    {
        return $this->hasMany(Kebutuhan::class);
    }

    public function kontrak(): HasMany
    {
        return $this->hasMany(Kontrak::class);
    }

    public function beritaAcaras(): HasMany
    {
        return $this->hasMany(BeritaAcara::class);
    }
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}