<?php
// Ganti Isi File: app/Http/Controllers/PegawaiController.php

namespace App\Http\Controllers;

use App\Enums\TahapanKegiatan;
use App\Http\Requests\StoreBeritaAcaraRequest;
use App\Http\Requests\StoreDokumentasiWithFilesRequest;
use App\Http\Requests\StoreKebutuhanRequest;
use App\Http\Requests\StoreKontrakRequest;
use App\Http\Resources\KegiatanResource;
use App\Models\BeritaAcara;
use App\Models\DokumentasiKegiatan;
use App\Models\Foto;
use App\Models\Kebutuhan;
use App\Models\Kegiatan;
use App\Models\Kontrak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    /**
     * Menampilkan halaman "Kegiatan Saya" untuk pegawai.
     */
    public function index()
    {
        $user = Auth::user();
        $kegiatans = Kegiatan::whereHas('tim.pegawai', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->with(['proposal', 'tim.pegawai', 'dokumentasi.fotos', 'kebutuhan', 'kontrak', 'beritaAcaras'])
        ->orderBy('tanggal_mulai', 'desc')
        ->get();

        return Inertia::render('Pegawai/KegiatanSaya', [
            'kegiatans' => KegiatanResource::collection($kegiatans),
        ]);
    }

    /**
     * Menangani konfirmasi kegiatan oleh pegawai.
     */
    public function konfirmasi(Kegiatan $kegiatan)
    {
        $kegiatan->update(['tahapan' => TahapanKegiatan::PERJALANAN_DINAS]);
        return redirect()->back()->with('success', 'Kegiatan dikonfirmasi.');
    }

    /**
     * Menyimpan dokumentasi tahap observasi.
     */
    public function storeObservasi(StoreDokumentasiWithFilesRequest $request, Kegiatan $kegiatan)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $kegiatan) {
            $dokumentasi = $kegiatan->dokumentasi()->create([
                'keterangan' => $data['keterangan'],
                'tipe' => 'observasi',
            ]);

            if (isset($data['fotos'])) {
                foreach ($data['fotos'] as $foto) {
                    $path = $foto->store('dokumentasi_fotos', 'public');
                    $dokumentasi->fotos()->create(['path' => $path]);
                }
            }
            // Mengubah tahapan setelah observasi selesai
            $kegiatan->update(['tahapan' => TahapanKegiatan::MENUNGGU_PROSES_KABID]);
        });

        return redirect()->back()->with('success', 'Dokumentasi observasi berhasil disimpan.');
    }
    
    /**
     * Method baru untuk menyimpan data kebutuhan yang diinput pegawai.
     */
    public function storeKebutuhan(StoreKebutuhanRequest $request, Kegiatan $kegiatan)
    {
        $data = $request->validated();
        $kegiatan->kebutuhan()->create($data);

        return redirect()->back()->with('success', 'Data kebutuhan berhasil disimpan.');
    }

    /**
     * Method baru untuk menyimpan data kontrak pihak ketiga yang diinput pegawai.
     */
    public function storeKontrak(StoreKontrakRequest $request, Kegiatan $kegiatan)
    {
        $data = $request->validated();
        $path = $data['dokumen_kontrak']->store('dokumen_kontraks', 'public');

        $kegiatan->kontrak()->create([
            'nama_pihak_ketiga' => $data['nama_pihak_ketiga'],
            'nomor_kontrak' => $data['nomor_kontrak'],
            'tanggal_kontrak' => $data['tanggal_kontrak'],
            'dokumen_path' => $path,
        ]);

        return redirect()->back()->with('success', 'Data kontrak berhasil disimpan.');
    }

    /**
     * Menyimpan dokumentasi tahap penyerahan.
     */
    public function storePenyerahan(StoreDokumentasiWithFilesRequest $request, Kegiatan $kegiatan)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $kegiatan) {
            $dokumentasi = $kegiatan->dokumentasi()->create([
                'keterangan' => $data['keterangan'],
                'tipe' => 'penyerahan',
            ]);

            if (isset($data['fotos'])) {
                foreach ($data['fotos'] as $foto) {
                    $path = $foto->store('dokumentasi_fotos', 'public');
                    $dokumentasi->fotos()->create(['path' => $path]);
                }
            }
            // Mengubah tahapan setelah penyerahan selesai
            $kegiatan->update(['tahapan' => TahapanKegiatan::PENYELESAIAN]);
        });
        
        return redirect()->back()->with('success', 'Dokumentasi penyerahan berhasil disimpan.');
    }

    /**
     * Menyimpan file berita acara yang diinput pegawai.
     */
    public function storeBeritaAcara(StoreBeritaAcaraRequest $request, Kegiatan $kegiatan)
    {
        $data = $request->validated();
        $path = $data['dokumen_berita_acara']->store('berita_acaras', 'public');

        $kegiatan->beritaAcaras()->create([
            'nama_berita_acara' => $data['nama_berita_acara'],
            'nomor_berita_acara' => $data['nomor_berita_acara'],
            'tanggal_berita_acara' => $data['tanggal_berita_acara'],
            'dokumen_path' => $path,
        ]);

        return redirect()->back()->with('success', 'Berita Acara berhasil disimpan.');
    }

    /**
     * Mengubah status akhir kegiatan menjadi 'selesai' atau 'dibatalkan'.
     */
    public function updateStatusAkhir(Request $request, Kegiatan $kegiatan)
    {
        $request->validate([
            'status_akhir' => ['required', 'in:selesai,dibatalkan'],
        ]);

        $tahapan = $request->input('status_akhir') === 'selesai'
            ? TahapanKegiatan::SELESAI
            : TahapanKegiatan::SELESAI;

        $kegiatan->update(['tahapan' => $tahapan]);

        return redirect()->back()->with('success', 'Status kegiatan berhasil diperbarui.');
    }
}