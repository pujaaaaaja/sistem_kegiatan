import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Komponen Card untuk menampilkan statistik
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 flex items-center">
            <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full ${color}`}>
                {icon}
            </div>
            <div className="ml-5 w-0 flex-1">
                <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                    <dd className="text-3xl font-bold text-gray-900">{value}</dd>
                </dl>
            </div>
        </div>
    </div>
);

// PERBAIKAN: Menghapus format Markdown ([...]) dari URL xmlns di semua ikon SVG.
const DocumentIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ActivityIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const UserGroupIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const MoneyIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m7 6v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1h12a1 1 0 001-1zm-1 1a1 1 0 100-2 1 1 0 000 2z" /></svg>;
const ClockIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const XCircleIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;


export default function Dashboard({ auth, stats }) {
    const userRole = auth.user.roles[0].name;

    const renderAdminDashboard = () => (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Proposal" value={stats.total_proposal} icon={<DocumentIcon />} color="bg-blue-500" />
            <StatCard title="Total Kegiatan" value={stats.total_kegiatan} icon={<ActivityIcon />} color="bg-green-500" />
            <StatCard title="Total Pengguna" value={stats.total_pengguna} icon={<UserGroupIcon />} color="bg-yellow-500" />
            <StatCard title="Total Anggaran" value={stats.total_anggaran} icon={<MoneyIcon />} color="bg-purple-500" />
        </div>
    );

    const renderPengusulDashboard = () => (
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Proposal Pending" value={stats.proposal_pending} icon={<ClockIcon />} color="bg-yellow-500" />
            <StatCard title="Proposal Disetujui" value={stats.proposal_disetujui} icon={<CheckCircleIcon />} color="bg-green-500" />
            <StatCard title="Proposal Ditolak" value={stats.proposal_ditolak} icon={<XCircleIcon />} color="bg-red-500" />
        </div>
    );

    const renderPegawaiDashboard = () => (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StatCard title="Kegiatan Berjalan" value={stats.kegiatan_berjalan} icon={<ClipboardListIcon />} color="bg-indigo-500" />
            <StatCard title="Kegiatan Selesai" value={stats.kegiatan_selesai} icon={<CheckCircleIcon />} color="bg-teal-500" />
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-gray-800">Selamat Datang, {auth.user.name}!</h3>
                        <p className="text-gray-500">Berikut adalah ringkasan aktivitas Anda.</p>
                    </div>

                    { (userRole === 'admin' || userRole === 'kadis' || userRole === 'kabid') && renderAdminDashboard() }
                    { userRole === 'pengusul' && renderPengusulDashboard() }
                    { userRole === 'pegawai' && renderPegawaiDashboard() }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}