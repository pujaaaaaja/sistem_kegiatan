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
        'user_id',
        'nama_proposal', // Sederhanakan
        'tanggal_proposal', // Sederhanakan
        'file_path', // Sederhanakan
        'status',
        'catatan_revisi',
    ];

    public function pengusul(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}