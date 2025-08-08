<?php
// Ganti Isi File: app/Models/Proposal.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Proposal extends Model
{
    use HasFactory;

    protected $fillable = [
        'pengusul_id',
        'nama_proposal', // Sederhanakan
        'tanggal_pengajuan', // Sederhanakan
        'dokumen_path', // Sederhanakan
        'status',
        'catatan_revisi',
        'alasan_penolakan', // <-- Tambahkan ini (dari migrasi)
        'verifikator_id',
        'verified_at',
    ];

    public function pengusul(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pengusul_id');
    }
}