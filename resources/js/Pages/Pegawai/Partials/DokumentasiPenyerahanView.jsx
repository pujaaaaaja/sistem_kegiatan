import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import TextAreaInput from '@/Components/TextAreaInput';

// Komponen ini menerima prop `onOpenKontrakModal` dari induknya
export default function DokumentasiPenyerahanView({ kegiatans, onOpenKontrakModal }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedKegiatan, setSelectedKegiatan] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        keterangan: '',
        fotos: [],
    });

    const openModal = (kegiatan) => {
        setSelectedKegiatan(kegiatan);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('pegawai.kegiatan.storePenyerahan', selectedKegiatan.id), {
            onSuccess: () => closeModal(),
        });
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nama Kegiatan</th>
                        <th scope="col" className="px-6 py-3">Tim</th>
                        <th scope="col" className="px-6 py-3">Dokumen Pihak Ke-3</th>
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kegiatans.map((kegiatan) => (
                        <tr key={kegiatan.id} className="bg-white border-b">
                            <td className="px-6 py-4">{kegiatan.nama_kegiatan}</td>
                            <td className="px-6 py-4">{kegiatan.tim.nama_tim}</td>
                            <td className="px-6 py-4">
                                {/* Tombol Input Kontrak */}
                                {kegiatan.kontrak.length === 0 ? (
                                    <PrimaryButton onClick={() => onOpenKontrakModal(kegiatan)}>
                                        Input Dokumen
                                    </PrimaryButton>
                                ) : (
                                     <a href={kegiatan.kontrak[0].dokumen_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Lihat Dokumen
                                    </a>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                 <PrimaryButton onClick={() => openModal(kegiatan)}>
                                    Upload Dokumentasi
                                </PrimaryButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onClose={closeModal}>
                 <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Upload Dokumentasi Penyerahan
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Lengkapi dokumentasi untuk kegiatan: <span className="font-semibold">{selectedKegiatan?.nama_kegiatan}</span>
                    </p>
                    <div className="mt-6">
                        <InputLabel htmlFor="keterangan" value="Keterangan" />
                        <TextAreaInput
                            id="keterangan"
                            className="mt-1 block w-full"
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                            required
                        />
                        <InputError message={errors.keterangan} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="fotos" value="Foto-foto (Bisa lebih dari satu)" />
                        <TextInput
                            id="fotos"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('fotos', e.target.files)}
                            multiple
                            required
                        />
                        <InputError message={errors.fotos} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}