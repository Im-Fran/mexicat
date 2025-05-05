import { BreadcrumbItem } from '@/types';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Overview',
        href: '/dashboard'
    }
]

type OverviewProps = {
    products: number;           // Total number of products
    users: number;              // Total number of users
    permissions: number;        // Total number of permissions
    roles: number;              // Total number of roles
}

const Overview = ({ products, users, permissions, roles }: OverviewProps) => <DashboardLayout breadcrumbs={breadcrumbs}>
    <Head title={"Panel de Control"}/>
    <div className={'flex flex-col gap-4 p-5'}>
        <h1 className={'text-2xl font-bold'}>Panel de Control - Mexicat</h1>
        <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'}>
            <div className={'bg-secondary text-secondary-foreground rounded-lg p-4 shadow-md'}>
                <h2 className={'text-xl font-semibold'}>Productos Totales</h2>
                <p className={'text-3xl font-bold'}>{products}</p>
            </div>
            <div className={'bg-secondary text-secondary-foreground rounded-lg p-4 shadow-md'}>
                <h2 className={'text-xl font-semibold'}>Usuarios Totales</h2>
                <p className={'text-3xl font-bold'}>{users}</p>
            </div>
            <div className={'bg-secondary text-secondary-foreground rounded-lg p-4 shadow-md'}>
                <h2 className="text-xl font-semibold">Permisos Totales</h2>
                <p className={'text-3xl font-bold'}>{permissions}</p>
            </div>
            <div className={'bg-secondary text-secondary-foreground rounded-lg p-4 shadow-md'}>
                <h2 className={'text-xl font-semibold'}>Roles Totales</h2>
                <p className={'text-3xl font-bold'}>{roles}</p>
            </div>
        </div>
    </div>
</DashboardLayout>;

export default Overview;
