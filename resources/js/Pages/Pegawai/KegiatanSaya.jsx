import PegawaiLayout from '@/Layouts/PegawaiLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import PerjalananDinasView from './Partials/PerjalananDinasView';
import DokumentasiObservasiView from './Partials/DokumentasiObservasiView';
import MenungguProsesKabidView from './Partials/MenungguProsesKabidView';
import DokumentasiPenyerahanView from './Partials/DokumentasiPenyerahanView';
import PenyelesaianView from './Partials/PenyelesaianView';
import SelesaiView from './Partials/SelesaiView';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from '@/Components/SelectInput';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function KegiatanSaya({ auth, kegiatans }) {
    // State untuk setiap modal
    const [modalState, setModalState] = useState({
        showKebutuhan: false,
        showKontrak: false,
        showBeritaAcara: false,
        selectedKegiatan: null,
    });
    
    // Forms untuk setiap modal
    const formKebutuhan = useForm({
        nama_kebutuhan: '',
        jumlah: '',
        satuan: '',
        harga_satuan: '',
    });

    const formKontrak = useForm({
        nama_pihak_ketiga: '',
        nomor_kontrak: '',
        tanggal_kontrak: '',
        dokumen_kontrak: null,
    });

    const formBeritaAcara = useForm({
        nama_berita_acara: '',
        nomor_berita_acara: '',
        tanggal_berita_acara: '',
        dokumen_berita_acara: null,
    });
    
    // Fungsi untuk membuka modal
    const openModal = (type, kegiatan) => {
        setModalState({ ...modalState, [`show${type}`]: true, selectedKegiatan: kegiatan });
    };

    // Fungsi untuk menutup modal
    const closeModal = (type) => {
        setModalState({ ...modalState, [`show${type}`]: false, selectedKegiatan: null });
        // Reset form yang sesuai
        if (type === 'Kebutuhan') formKebutuhan.reset();
        if (type === 'Kontrak') formKontrak.reset();
        if (type === 'BeritaAcara') formBeritaAcara.reset();
    };

    // Fungsi submit untuk setiap form
    const submitKebutuhan = (e) => {
        e.preventDefault();
        formKebutuhan.post(route('pegawai.kegiatan.storeKebutuhan', modalState.selectedKegiatan.id), {
            onSuccess: () => closeModal('Kebutuhan'),
        });
    };

    const submitKontrak = (e) => {
        e.preventDefault();
        formKontrak.post(route('pegawai.kegiatan.storeKontrak', modalState.selectedKegiatan.id), {
            onSuccess: () => closeModal('Kontrak'),
        });
    };

    const submitBeritaAcara = (e) => {
        e.preventDefault();
        formBeritaAcara.post(route('pegawai.kegiatan.storeBeritaAcara', modalState.selectedKegiatan.id), {
            onSuccess: () => closeModal('BeritaAcara'),
        });
    };

    // Filter kegiatan berdasarkan tahapan
    const tahapanKegiatan = {
        'Perjalanan Dinas': kegiatans.data.filter(k => k.tahapan.value === 1),
        'Dokumentasi Observasi': kegiatans.data.filter(k => k.tahapan.value === 2),
        'Menunggu Proses Kabid': kegiatans.data.filter(k => k.tahapan.value === 3),
        'Dokumentasi Penyerahan': kegiatans.data.filter(k => k.tahapan.value === 4),
        'Penyelesaian': kegiatans.data.filter(k => k.tahapan.value === 5),
        'Selesai / Diarsipkan': kegiatans.data.filter(k => k.tahapan.value === 6 || k.tahapan.value === 7),
    };

    return (
        <PegawaiLayout user={auth.user} header="Kegiatan Saya">
            <Head title="Kegiatan Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                                {Object.keys(tahapanKegiatan).map((tahap) => (
                                    <Tab
                                        key={tahap}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-white text-blue-700 shadow'
                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        {tahap}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel><PerjalananDinasView kegiatans={tahapanKegiatan['Perjalanan Dinas']} /></Tab.Panel>
                                <Tab.Panel><DokumentasiObservasiView kegiatans={tahapanKegiatan['Dokumentasi Observasi']} onOpenKebutuhanModal={kegiatan => openModal('Kebutuhan', kegiatan)} /></Tab.Panel>
                                <Tab.Panel><MenungguProsesKabidView kegiatans={tahapanKegiatan['Menunggu Proses Kabid']} /></Tab.Panel>
                                <Tab.Panel><DokumentasiPenyerahanView kegiatans={tahapanKegiatan['Dokumentasi Penyerahan']} onOpenKontrakModal={kegiatan => openModal('Kontrak', kegiatan)} /></Tab.Panel>
                                <Tab.Panel><PenyelesaianView kegiatans={tahapanKegiatan['Penyelesaian']} onOpenBeritaAcaraModal={kegiatan => openModal('BeritaAcara', kegiatan)} /></Tab.Panel>
                                <Tab.Panel><SelesaiView kegiatans={tahapanKegiatan['Selesai / Diarsipkan']} /></Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
            
            {/* Modal untuk Input Kebutuhan */}
            <Modal show={modalState.showKebutuhan} onClose={() => closeModal('Kebutuhan')}>
                <form onSubmit={submitKebutuhan} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Input Data Kebutuhan</h2>
                    <div className="mt-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="nama_kebutuhan" value="Nama Kebutuhan" />
                            <TextInput id="nama_kebutuhan" className="w-full" value={formKebutuhan.data.nama_kebutuhan} onChange={e => formKebutuhan.setData('nama_kebutuhan', e.target.value)} />
                            <InputError message={formKebutuhan.errors.nama_kebutuhan} />
                        </div>
                        <div>
                            <InputLabel htmlFor="jumlah" value="Jumlah" />
                            <TextInput id="jumlah" type="number" className="w-full" value={formKebutuhan.data.jumlah} onChange={e => formKebutuhan.setData('jumlah', e.target.value)} />
                             <InputError message={formKebutuhan.errors.jumlah} />
                        </div>
                        <div>
                            <InputLabel htmlFor="satuan" value="Satuan" />
                            <TextInput id="satuan" className="w-full" value={formKebutuhan.data.satuan} onChange={e => formKebutuhan.setData('satuan', e.target.value)} />
                             <InputError message={formKebutuhan.errors.satuan} />
                        </div>
                        <div>
                            <InputLabel htmlFor="harga_satuan" value="Harga Satuan" />
                            <TextInput id="harga_satuan" type="number" className="w-full" value={formKebutuhan.data.harga_satuan} onChange={e => formKebutuhan.setData('harga_satuan', e.target.value)} />
                             <InputError message={formKebutuhan.errors.harga_satuan} />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => closeModal('Kebutuhan')}>Batal</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={formKebutuhan.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal untuk Input Kontrak */}
            <Modal show={modalState.showKontrak} onClose={() => closeModal('Kontrak')}>
                 <form onSubmit={submitKontrak} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Input Dokumen Pihak Ketiga</h2>
                     <div className="mt-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="nama_pihak_ketiga" value="Nama Pihak Ketiga" />
                            <TextInput id="nama_pihak_ketiga" className="w-full" value={formKontrak.data.nama_pihak_ketiga} onChange={e => formKontrak.setData('nama_pihak_ketiga', e.target.value)} />
                            <InputError message={formKontrak.errors.nama_pihak_ketiga} />
                        </div>
                        <div>
                            <InputLabel htmlFor="nomor_kontrak" value="Nomor Kontrak" />
                            <TextInput id="nomor_kontrak" className="w-full" value={formKontrak.data.nomor_kontrak} onChange={e => formKontrak.setData('nomor_kontrak', e.target.value)} />
                             <InputError message={formKontrak.errors.nomor_kontrak} />
                        </div>
                        <div>
                            <InputLabel htmlFor="tanggal_kontrak" value="Tanggal Kontrak" />
                            <TextInput id="tanggal_kontrak" type="date" className="w-full" value={formKontrak.data.tanggal_kontrak} onChange={e => formKontrak.setData('tanggal_kontrak', e.target.value)} />
                             <InputError message={formKontrak.errors.tanggal_kontrak} />
                        </div>
                        <div>
                            <InputLabel htmlFor="dokumen_kontrak" value="File Dokumen Kontrak" />
                            <TextInput id="dokumen_kontrak" type="file" className="w-full" onChange={e => formKontrak.setData('dokumen_kontrak', e.target.files[0])} />
                             <InputError message={formKontrak.errors.dokumen_kontrak} />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => closeModal('Kontrak')}>Batal</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={formKontrak.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal untuk Input Berita Acara */}
            <Modal show={modalState.showBeritaAcara} onClose={() => closeModal('BeritaAcara')}>
                <form onSubmit={submitBeritaAcara} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Input Berita Acara</h2>
                    <div className="mt-6 space-y-4">
                         <div>
                            <InputLabel htmlFor="nama_berita_acara" value="Nama Berita Acara" />
                            <TextInput id="nama_berita_acara" className="w-full" value={formBeritaAcara.data.nama_berita_acara} onChange={e => formBeritaAcara.setData('nama_berita_acara', e.target.value)} />
                            <InputError message={formBeritaAcara.errors.nama_berita_acara} />
                        </div>
                        <div>
                            <InputLabel htmlFor="nomor_berita_acara" value="Nomor Berita Acara" />
                            <TextInput id="nomor_berita_acara" className="w-full" value={formBeritaAcara.data.nomor_berita_acara} onChange={e => formBeritaAcara.setData('nomor_berita_acara', e.target.value)} />
                            <InputError message={formBeritaAcara.errors.nomor_berita_acara} />
                        </div>
                        <div>
                            <InputLabel htmlFor="tanggal_berita_acara" value="Tanggal Berita Acara" />
                            <TextInput id="tanggal_berita_acara" type="date" className="w-full" value={formBeritaAcara.data.tanggal_berita_acara} onChange={e => formBeritaAcara.setData('tanggal_berita_acara', e.target.value)} />
                            <InputError message={formBeritaAcara.errors.tanggal_berita_acara} />
                        </div>
                         <div>
                            <InputLabel htmlFor="dokumen_berita_acara" value="File Dokumen" />
                            <TextInput id="dokumen_berita_acara" type="file" className="w-full" onChange={e => formBeritaAcara.setData('dokumen_berita_acara', e.target.files[0])} />
                            <InputError message={formBeritaAcara.errors.dokumen_berita_acara} />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => closeModal('BeritaAcara')}>Batal</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={formBeritaAcara.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </PegawaiLayout>
    );
}