import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';

// Komponen ini sekarang menerima prop untuk membuka modal
export default function PenyelesaianView({ kegiatans, onOpenBeritaAcaraModal }) {
    const { data, setData, post, processing } = useForm({
        status_akhir: 'selesai',
    });

    const handleSelesaikan = (kegiatan) => {
        if (confirm('Apakah Anda yakin ingin menyelesaikan kegiatan ini?')) {
            post(route('pegawai.kegiatan.updateStatusAkhir', kegiatan.id));
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                {/* ... thead ... */}
                <tbody>
                    {kegiatans.map((kegiatan) => (
                        <tr key={kegiatan.id}>
                            {/* ... td lainnya ... */}
                            <td className="px-6 py-4">
                                {/* Tombol Input Berita Acara */}
                                {kegiatan.berita_acaras.length === 0 ? (
                                    <PrimaryButton onClick={() => onOpenBeritaAcaraModal(kegiatan)}>
                                        Input Berita Acara
                                    </PrimaryButton>
                                ) : (
                                    <Link href={kegiatan.berita_acaras[0].dokumen_url} target="_blank" className="text-blue-600 hover:underline">
                                        Lihat Berita Acara
                                    </Link>
                                )}
                            </td>
                            <td className="px-6 py-4 flex items-center gap-2">
                                <SelectInput
                                    id="status_akhir"
                                    value={data.status_akhir}
                                    onChange={(e) => setData('status_akhir', e.target.value)}
                                >
                                    <option value="selesai">Selesai</option>
                                    <option value="dibatalkan">Dibatalkan</option>
                                </SelectInput>
                                <PrimaryButton onClick={() => handleSelesaikan(kegiatan)} disabled={processing}>
                                    Submit
                                </PrimaryButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}