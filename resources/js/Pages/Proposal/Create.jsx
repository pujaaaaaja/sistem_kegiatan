import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }) {
    const { data, setData, post, errors, processing } = useForm({
        nama_proposal: '',
        tanggal_proposal: '',
        file_path: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('proposal.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Proposal Baru</h2>}
        >
            <Head title="Buat Proposal" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="flex flex-col gap-4">
                                <div>
                                    <InputLabel htmlFor="nama_proposal" value="Nama Proposal" />
                                    <TextInput
                                        id="nama_proposal"
                                        name="nama_proposal"
                                        value={data.nama_proposal}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('nama_proposal', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nama_proposal} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="tanggal_proposal" value="Tanggal Proposal" />
                                    <TextInput
                                        id="tanggal_proposal"
                                        type="date"
                                        name="tanggal_proposal"
                                        value={data.tanggal_proposal}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('tanggal_proposal', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.tanggal_proposal} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="file_path" value="File Proposal (PDF/DOCX)" />
                                    <TextInput
                                        id="file_path"
                                        type="file"
                                        name="file_path"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('file_path', e.target.files[0])}
                                        required
                                    />
                                    <InputError message={errors.file_path} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}