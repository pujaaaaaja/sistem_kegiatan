<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class KegiatanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_kegiatan' => $this->nama_kegiatan,
            'anggaran' => 'Rp ' . number_format($this->anggaran, 2, ',', '.'),
            'tanggal_mulai' => $this->tanggal_mulai,
            'tanggal_selesai' => $this->tanggal_selesai,
            'tahapan' => $this->tahapan,
            'sktl_url' => $this->sktl ? Storage::url($this->sktl) : null,
            // Tambahkan URL untuk SKTL Penyerahan
            'sktl_penyerahan_url' => $this->sktl_penyerahan_path ? Storage::url($this->sktl_penyerahan_path) : null,
            'proposal' => new ProposalResource($this->whenLoaded('proposal')),
            'tim' => new TimResource($this->whenLoaded('tim')),
            'dokumentasi' => DokumentasiKegiatanResource::collection($this->whenLoaded('dokumentasi')),
            // Load relasi baru
            'kebutuhan' => KebutuhanResource::collection($this->whenLoaded('kebutuhan')),
            'kontrak' => KontrakResource::collection($this->whenLoaded('kontrak')),
            'berita_acaras' => BeritaAcaraResource::collection($this->whenLoaded('beritaAcaras')),
        ];
    }
}