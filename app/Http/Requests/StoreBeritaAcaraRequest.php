<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBeritaAcaraRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Otorisasi ditangani di controller
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
        {
            return [
                'nama_berita_acara' => ['required', 'string', 'max:255'], // Tambahkan ini
                'nomor_berita_acara' => ['required', 'string', 'max:255'],
                'tanggal_berita_acara' => ['required', 'date'],
                'dokumen_berita_acara' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
            ];
        }
}
