import ConfirmationButton from '@/components/confirmation-button';
import { PaginatedDataTable } from '@/components/data-table/paginated-data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem, PaginatedResponse, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Column, ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown, Edit, Search, Trash } from 'lucide-react';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href:  route('dashboard.overview'),
    },
    {
        title: 'Clientes',
        href: route('dashboard.customers.index'),
    },
];

const getSortDirection = (column: Column<User>) => {
    const sort = new URL(window.location.href).searchParams.get('sort') || '';
    if (sort === column.id) {
        return 'asc';
    } else if (sort === `-${column.id}`) {
        return 'desc';
    }
    return 'asc';
};

const toggleSort = (column: Column<User>) => {
    router.reload({
        data: { sort: getSortDirection(column) === 'asc' ? `-${column.id}` : column.id },
        only: ['users'],
    });
};

export const columns: ColumnDef<User>[] = [
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
        accessorKey: 'email',
        header: ({ column }) => (
            <Button variant={'ghost'} onClick={() => toggleSort(column)}>
                Email
                <ArrowUpDown className={'ml-2 h-4 w-4'} />
            </Button>
        ),
    },
    {
        accessorKey: 'addresses',
        header: 'Direcciones',
        cell: ({ row }) => {
            const addresses = row.original.addresses || [];
            return addresses.length;
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => (
            <Button variant={'ghost'} onClick={() => toggleSort(column)}>
                Registrado
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
                    <Link href={route('dashboard.customers.edit', { customer: row.original.id })} prefetch>
                        <Button variant={'link'}>
                            <Edit className={'h-4 w-4'} />
                        </Button>
                    </Link>
                    <ConfirmationButton
                        variant={'destructive'}
                        onConfirm={() => router.delete(route('dashboard.customers.delete', { customer: row.original.id }))}
                    >
                        <Trash className={'h-4 w-4'} />
                    </ConfirmationButton>
                </div>
            );
        },
    },
];

type CustomersProps = {
    users: PaginatedResponse<User>;
};

const Customers = ({ users }: CustomersProps) => {
    const url = new URL(window.location.href);
    const [searchTerm, setSearchTerm] = useState<string>(url.searchParams.get('filter[name]') || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            route('dashboard.customers.index'),
            {
                'filter[name]': searchTerm,
            },
            {
                preserveState: true,
                only: ['users'],
            },
        );
    };

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title={'Clientes'} />

            <div className={'p-5'}>
                <div className={'flex w-full items-center justify-between'}>
                    <h1 className={'mb-5 text-2xl font-bold'}>Clientes</h1>
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
                    </form>
                </div>

                <PaginatedDataTable columns={columns} data={users} />
            </div>
        </DashboardLayout>
    );
};

export default Customers;
