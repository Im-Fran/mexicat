import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem, PaginatedResponse, Role } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Column, ColumnDef } from '@tanstack/react-table';
import { PaginatedDataTable } from '@/components/data-table/paginated-data-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Plus, Search, Trash } from 'lucide-react';
import dayjs from 'dayjs';
import ConfirmationButton from '@/components/confirmation-button';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard.overview'),
    },
    {
        title: 'Roles',
        href: route('dashboard.roles.index'),
    },
];

const getSortDirection = (column: Column<Role>) => {
    const sort = new URL(window.location.href).searchParams.get('sort') || '';
    if (sort === column.id) {
        return 'asc';
    } else if (sort === `-${column.id}`) {
        return 'desc';
    }
    return 'asc';
};

const toggleSort = (column: Column<Role>) => {
    router.reload({
        data: { sort: getSortDirection(column) === 'asc' ? `-${column.id}` : column.id },
        only: ['roles'],
    });
};

export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button variant={'ghost'} onClick={() => toggleSort(column)}>
                Nombre
                <ArrowUpDown className={'ml-2 h-4 w-4'} />
            </Button>
        ),
    },
    {
        accessorKey: 'permissions',
        header: 'Permisos',
        cell: ({ row }) => {
            const permissions = row.original.permissions || [];
            return permissions.length;
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => (
            <Button variant={'ghost'} onClick={() => toggleSort(column)}>
                Creado
                <ArrowUpDown className={'ml-2 h-4 w-4'} />
            </Button>
        ),
        cell: ({ row }) => {
            const date = dayjs(row.getValue('created_at'));
            return <span data-date={date.toISOString()}>{date.fromNow()}</span>;
        },
    },
    {
        accessorKey: 'updated_at',
        header: ({ column }) => (
            <Button variant={'ghost'} onClick={() => toggleSort(column)}>
                Actualizado
                <ArrowUpDown className={'ml-2 h-4 w-4'} />
            </Button>
        ),
        cell: ({ row }) => {
            const date = dayjs(row.getValue('updated_at'));
            return <span data-date={date.toISOString()}>{date.fromNow()}</span>;
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className={'flex gap-2'}>
                    <Link href={route('dashboard.roles.edit', { role: row.original.id })} prefetch>
                        <Button variant={'link'}>
                            <Edit className={'h-4 w-4'} />
                        </Button>
                    </Link>
                    <ConfirmationButton
                        variant={'destructive'}
                        onConfirm={() => router.delete(route('dashboard.roles.delete', { role: row.original.id }))}
                    >
                        <Trash className={'h-4 w-4'} />
                    </ConfirmationButton>
                </div>
            );
        },
    },
];

type RolesProps = {
    roles: PaginatedResponse<Role>;
};

const Roles = ({ roles }: RolesProps) => {
    const url = new URL(window.location.href);
    const [searchTerm, setSearchTerm] = useState<string>(url.searchParams.get('filter[name]') || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            route('dashboard.roles.index'),
            {
                'filter[name]': searchTerm,
            },
            {
                preserveState: true,
                only: ['roles'],
            },
        );
    };

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title={'Roles'} />

            <div className={'p-5'}>
                <div className={'flex w-full items-center justify-between'}>
                    <h1 className={'mb-5 text-2xl font-bold'}>Roles</h1>
                </div>

                <div className="mb-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Button type="submit">Buscar</Button>
                        <Link href={route('dashboard.roles.create')}>
                            <Button type="button">
                                <Plus className={'h-4 w-4'} />
                            </Button>
                        </Link>
                    </form>
                </div>

                <PaginatedDataTable columns={columns} data={roles} />
            </div>
        </DashboardLayout>
    );
};

export default Roles;
