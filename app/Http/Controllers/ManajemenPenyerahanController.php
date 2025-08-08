<?php
// Ganti Isi File: app/Http/Controllers/ManajemenPenyerahanController.php

namespace App\Http\Controllers;

use App\Enums\TahapanKegiatan;
use App\Http\Resources\KegiatanResource;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManajemenPenyerahanController extends Controller
{
    public function index()
    {
        $kegiatans = Kegiatan::where('tahapan', TahapanKegiatan::MENUNGGU_PROSES_KABID)
            ->with(['proposal', 'tim.pegawai'])
            ->get();

        return Inertia::render('Kegiatan/IndexPenyerahan', [
            'kegiatans' => KegiatanResource::collection($kegiatans),
        ]);
    }

    // Modifikasi method proses untuk menerima file SKTL Penyerahan
    public function proses(Request $request, Kegiatan $kegiatan)
    {
        $request->validate([
            'sktl_penyerahan' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:2048'],
        ]);

        $path = $request->file('sktl_penyerahan')->store('sktl_penyerahan', 'public');

        $kegiatan->update([
            'sktl_penyerahan_path' => $path,
            'tahapan' => TahapanKegiatan::DOKUMENTASI_PENYERAHAN,
        ]);

        return redirect()->back()->with('success', 'Kegiatan berhasil diproses untuk penyerahan.');
    }
}