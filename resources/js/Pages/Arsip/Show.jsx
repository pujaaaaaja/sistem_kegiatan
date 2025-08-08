import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, kegiatan }) {
    const { data } = kegiatan;

    const renderDokumentasi = (tipe) => {
        const dok = data.dokumentasi.find(d => d.tipe === tipe);
        if (!dok) return <p className="text-gray-500">Tidak ada dokumentasi.</p>;

        return (
            <div>
                <p className="mt-1 text-sm text-gray-600">{dok.keterangan}</p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {dok.fotos.map(foto => (
                        <a key={foto.id} href={foto.url} target="_blank" rel="noopener noreferrer">
                            <img src={foto.url} alt="Foto Dokumentasi" className="rounded-lg object-cover h-48 w-full" />
                        </a>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Arsip Kegiatan</h2>}
        >
            <Head title={`Arsip - ${data.nama_kegiatan}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Informasi Umum */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">Informasi Umum</h3>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div><span className="font-semibold">Nama Kegiatan:</span> {data.nama_kegiatan}</div>
                            <div><span className="font-semibold">Anggaran:</span> {data.anggaran}</div>
                            <div><span className="font-semibold">Tanggal:</span> {data.tanggal_mulai} s/d {data.tanggal_selesai}</div>
                            <div><span className="font-semibold">Tim Pelaksana:</span> {data.tim.nama_tim}</div>
                            <div><span className="font-semibold">Status Akhir:</span> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${data.tahapan.value === 6 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{data.tahapan.name}</span></div>
                            <div>
                                <span className="font-semibold">SKTL Awal:</span>
                                <a href={data.sktl_url} target="_blank" className="ml-2 text-blue-600 hover:underline">Lihat File</a>
                            </div>
                            {data.sktl_penyerahan_url && (
                                <div>
                                    <span className="font-semibold">SKTL Penyerahan:</span>
                                    <a href={data.sktl_penyerahan_url} target="_blank" className="ml-2 text-blue-600 hover:underline">Lihat File</a>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Detail Kebutuhan */}
                    {data.kebutuhan.length > 0 && (
                         <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">Detail Kebutuhan</h3>
                             <table className="w-full mt-4 text-sm">
                                 {/* ... thead ... */}
                                 <tbody>
                                     {data.kebutuhan.map(item => (
                                         <tr key={item.id}>
                                             <td>{item.nama_kebutuhan}</td>
                                             <td>{item.jumlah} {item.satuan}</td>
                                             <td>{item.harga_satuan_formatted}</td>
                                             <td>{item.total_harga_formatted}</td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                        </div>
                    )}

                     {/* Detail Kontrak Pihak Ketiga */}
                    {data.kontrak.length > 0 && (
                         <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">Dokumen Pihak Ketiga</h3>
                            {data.kontrak.map(item => (
                                <div key={item.id} className="mt-4 text-sm">
                                    <p><span className="font-semibold">Nama Pihak Ketiga:</span> {item.nama_pihak_ketiga}</p>
                                    <p><span className="font-semibold">Nomor Kontrak:</span> {item.nomor_kontrak}</p>
                                    <p><span className="font-semibold">Tanggal Kontrak:</span> {item.tanggal_kontrak}</p>
                                    <a href={item.dokumen_url} target="_blank" className="text-blue-600 hover:underline">Lihat Dokumen Kontrak</a>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Detail Berita Acara */}
                    {data.berita_acaras.length > 0 && (
                         <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">Berita Acara</h3>
                            {data.berita_acaras.map(item => (
                                <div key={item.id} className="mt-4 text-sm">
                                    <p><span className="font-semibold">Nama Berita Acara:</span> {item.nama_berita_acara}</p>
                                    <p><span className="font-semibold">Nomor:</span> {item.nomor_berita_acara}</p>
                                    <p><span className="font-semibold">Tanggal:</span> {item.tanggal_berita_acara}</p>
                                    <a href={item.dokumen_url} target="_blank" className="text-blue-600 hover:underline">Lihat Dokumen Berita Acara</a>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Dokumentasi Observasi */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">Dokumentasi Observasi</h3>
                        {renderDokumentasi('observasi')}
                    </div>

                    {/* Dokumentasi Penyerahan */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">Dokumentasi Penyerahan</h3>
                        {renderDokumentasi('penyerahan')}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}