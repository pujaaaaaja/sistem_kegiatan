<?php
// Ganti Isi File: routes/web.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TimController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ArsipController;
use App\Http\Controllers\VerifikasiProposalController;
use App\Http\Controllers\ManajemenPenyerahanController;
use App\Http\Controllers\PegawaiController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect()->route('login');
});

// PERBAIKAN: Memanggil controller invokable dengan benar, tanpa menyebutkan nama method.
Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Rute untuk Semua Peran yang Terotentikasi ---
    Route::get('/arsip', [ArsipController::class, 'index'])->name('arsip.index');
    Route::get('/arsip/{kegiatan}', [ArsipController::class, 'show'])->name('arsip.show');

    // --- Rute untuk Role: Pengusul ---
    Route::middleware(['role:pengusul|admin'])->group(function () {
        Route::get('/proposal-saya', [ProposalController::class, 'myProposals'])->name('proposal.myIndex');
        Route::get('/proposal/create', [ProposalController::class, 'create'])->name('proposal.create');
        Route::post('/proposal', [ProposalController::class, 'store'])->name('proposal.store');
    });

    // --- Rute Bersama untuk Kadis, Kabid & Admin ---
    Route::middleware(['role:kadis|kabid|admin'])->group(function() {
        Route::get('/proposal-disetujui', [ProposalController::class, 'approvedIndex'])->name('kabid.proposal.index');
    });

    // --- Rute untuk Role: Kadis ---
    Route::middleware(['role:kadis|admin'])->group(function () {
        Route::get('/verifikasi-proposal', [VerifikasiProposalController::class, 'index'])->name('verifikasi.proposal.index');
        Route::patch('/verifikasi-proposal/{proposal}', [VerifikasiProposalController::class, 'update'])->name('verifikasi.proposal.update');
    });

    // --- Rute untuk Role: Kabid & Admin ---
    // PERBAIKAN: Menggabungkan semua rute Kabid ke dalam satu grup untuk kejelasan.
    Route::middleware(['role:kabid|admin'])->group(function () {
        Route::resource('tim', TimController::class);
        Route::resource('kegiatan', KegiatanController::class);
        
        // Rute Manajemen Penyerahan yang sudah benar
        Route::get('/manajemen-penyerahan', [ManajemenPenyerahanController::class, 'index'])->name('manajemen.penyerahan.index');
        Route::post('/manajemen-penyerahan/{kegiatan}/proses', [ManajemenPenyerahanController::class, 'proses'])->name('manajemen.penyerahan.proses');
    });
    
    // Rute untuk Pegawai
    Route::middleware(['auth', 'role:pegawai'])->prefix('pegawai')->name('pegawai.')->group(function () {
        Route::get('/kegiatan-saya', [PegawaiController::class, 'index'])->name('kegiatan.index');
        Route::post('/kegiatan/{kegiatan}/konfirmasi', [PegawaiController::class, 'konfirmasi'])->name('kegiatan.konfirmasi');
        Route::post('/kegiatan/{kegiatan}/store-observasi', [PegawaiController::class, 'storeObservasi'])->name('kegiatan.storeObservasi');
        Route::post('/kegiatan/{kegiatan}/store-penyerahan', [PegawaiController::class, 'storePenyerahan'])->name('kegiatan.storePenyerahan');
        Route::post('/kegiatan/{kegiatan}/store-kebutuhan', [PegawaiController::class, 'storeKebutuhan'])->name('kegiatan.storeKebutuhan');
        Route::post('/kegiatan/{kegiatan}/store-kontrak', [PegawaiController::class, 'storeKontrak'])->name('kegiatan.storeKontrak');
        Route::post('/kegiatan/{kegiatan}/store-berita-acara', [PegawaiController::class, 'storeBeritaAcara'])->name('kegiatan.storeBeritaAcara');
        Route::post('/kegiatan/{kegiatan}/update-status-akhir', [PegawaiController::class, 'updateStatusAkhir'])->name('kegiatan.updateStatusAkhir');
    });

    // PERBAIKAN: Menghapus grup rute Manajemen Penyerahan yang duplikat.
    // Grup ini sudah digabungkan ke dalam grup 'kabid|admin' di atas.

    // --- Rute KHUSUS Admin ---
    Route::middleware(['role:admin'])->group(function() {
        Route::resource('user', UserController::class);
        Route::resource('proposal', ProposalController::class)->except(['create', 'store']);
    });
});

require __DIR__.'/auth.php';
