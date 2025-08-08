import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import TextAreaInput from '@/Components/TextAreaInput';

// Komponen ini sekarang menerima prop untuk membuka modal
export default function DokumentasiObservasiView({ kegiatans, onOpenKebutuhanModal }) {
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
        post(route('pegawai.kegiatan.storeObservasi', selectedKegiatan.id), {
            onSuccess: () => closeModal(),
        });
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
                                {/* Tombol Input Kebutuhan */}
                                {kegiatan.kebutuhan.length === 0 ? (
                                    <PrimaryButton onClick={() => onOpenKebutuhanModal(kegiatan)}>
                                        Input Kebutuhan
                                    </PrimaryButton>
                                ) : (
                                    <Link href={route('kebutuhan.show', kegiatan.id)}>
                                        <SecondaryButton>Lihat Kebutuhan</SecondaryButton>
                                    </Link>
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
                {/* ... form modal untuk upload dokumentasi observasi ... */}
            </Modal>
        </div>
    );
}