import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function IndexPenyerahan({ auth, kegiatans }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedKegiatan, setSelectedKegiatan] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        sktl_penyerahan: null,
    });

    const openModal = (kegiatan) => {
        setSelectedKegiatan(kegiatan);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const submitProses = (e) => {
        e.preventDefault();
        post(route('manajemen-penyerahan.proses', selectedKegiatan.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Penyerahan</h2>}
        >
            <Head title="Manajemen Penyerahan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Nama Kegiatan</th>
                                        <th className="px-6 py-3">Tim</th>
                                        <th className="px-6 py-3">Tanggal</th>
                                        <th className="px-6 py-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kegiatans.data.map((kegiatan) => (
                                        <tr key={kegiatan.id} className="bg-white border-b">
                                            <td className="px-6 py-4">{kegiatan.nama_kegiatan}</td>
                                            <td className="px-6 py-4">{kegiatan.tim.nama_tim}</td>
                                            <td className="px-6 py-4">{kegiatan.tanggal_mulai} s/d {kegiatan.tanggal_selesai}</td>
                                            <td className="px-6 py-4">
                                                <PrimaryButton onClick={() => openModal(kegiatan)}>
                                                    Proses
                                                </PrimaryButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={submitProses} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Proses Kegiatan Penyerahan
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Upload SKTL Penyerahan untuk melanjutkan kegiatan ini ke tahap berikutnya.
                    </p>
                    <div className="mt-6">
                        <InputLabel htmlFor="sktl_penyerahan" value="File SKTL Penyerahan (PDF/DOCX)" />
                        <TextInput
                            id="sktl_penyerahan"
                            type="file"
                            name="sktl_penyerahan"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('sktl_penyerahan', e.target.files[0])}
                            required
                        />
                        <InputError message={errors.sktl_penyerahan} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}