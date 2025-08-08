<?php
// Ganti Isi File: app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Proposal;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Method __invoke akan otomatis dipanggil ketika controller ini diakses.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $stats = [];

        // PERBAIKAN: Menggunakan metode role ===() yang benar untuk memeriksa peran.
        if ($user->role === ('admin') || $user->role ===('kadis') || $user->role ===('kabid')) {
            $stats = [
                'total_proposal' => Proposal::count(),
                'total_kegiatan' => Kegiatan::count(),
                'total_pengguna' => User::count(),
                // 'total_anggaran' => 'Rp ' . number_format(Kegiatan::sum('anggaran'), 0, ',', '.'),
            ];
        } 
        elseif ($user->role ===('pengusul')) {
            // $stats = [
            //     'proposal_pending' => Proposal::where('user_id', $user->id)->where('status', 'disetujui')->count(),
            //     'proposal_disetujui' => Proposal::where('user_id', $user->id)->where('status', 'disetujui')->count(),
            //     'proposal_ditolak' => Proposal::where('user_id', $user->id)->where('status', 'disetujui')->count(),
            // ];
        } 
        elseif ($user->role ===('pegawai')) {
            $stats = [
                'kegiatan_berjalan' => Kegiatan::whereHas('tim.pegawai', function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    })
                    ->whereNotIn('tahapan', ['selesai', 'dibatalkan'])
                    ->count(),
                'kegiatan_selesai' => Kegiatan::whereHas('tim.pegawai', function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    })
                    ->whereIn('tahapan', ['selesai', 'dibatalkan'])
                    ->count(),
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}