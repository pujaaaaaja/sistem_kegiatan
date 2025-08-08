<?php
// Ganti Isi File: app/Http/Controllers/ArsipController.php

namespace App\Http\Controllers;

use App\Http\Resources\KegiatanResource;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArsipController extends Controller
{
    public function index()
    {
        // Mengambil kegiatan yang sudah selesai atau dibatalkan
        $kegiatans = Kegiatan::whereIn('tahapan', ['selesai', 'dibatalkan'])
            ->with(['proposal.pengusul', 'tim.pegawai'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Arsip/Index', [
            'kegiatans' => KegiatanResource::collection($kegiatans),
        ]);
    }

    public function show(Kegiatan $kegiatan)
    {
        // Memuat semua relasi yang diperlukan untuk ditampilkan di detail arsip
        $kegiatan->load([
            'proposal.pengusul',
            'tim.pegawai',
            'dokumentasi' => function ($query) {
                $query->with('fotos');
            },
            'kebutuhan',
            'kontrak',
            'beritaAcaras'
        ]);

        return Inertia::render('Arsip/Show', [
            'kegiatan' => new KegiatanResource($kegiatan),
        ]);
    }
}