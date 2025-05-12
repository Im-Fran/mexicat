import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem, PaginatedResponse, Product } from '@/types';
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
        title: 'Productos',
        href: route('dashboard.products.index'),
    },
]

const getSortDirection = (column: Column<Product>) => {
    const sort = (new URL(window.location.href)).searchParams.get('sort') || ''
    if (sort === column.id) {
        return 'asc'
    } else if (sort === `-${column.id}`) {
        return 'desc'
    }
    return 'asc'
}

const toggleSort = (column: Column<Product>) => {
    router.reload({
        data: { sort: getSortDirection(column) === 'asc' ? `-${column.id}` : column.id },
        only: ['products']
    })
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'sku',
        header: ({ column }) => <Button variant={'ghost'} onClick={() => toggleSort(column)}>
            SKU
            <ArrowUpDown className={'ml-2 w-4 h-4'} />
        </Button>
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => <Button variant={'ghost'} onClick={() => toggleSort(column)}>
            Stock
            <ArrowUpDown className={'ml-2 w-4 h-4'} />
        </Button>
    },
    {
        accessorKey: 'price',
        header: ({ column }) => <Button variant={'ghost'} onClick={() => toggleSort(column)}>
            Precio
            <ArrowUpDown className={'ml-2 w-4 h-4'} />
        </Button>,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <Button variant={'ghost'} onClick={() => toggleSort(column)}>
            Creado
            <ArrowUpDown className={'ml-2 w-4 h-4'} />
        </Button>,
        cell: ({ row }) => {
            const date = dayjs(row.getValue('created_at'))
            return <span data-date={date.toISOString()}>{date.fromNow()}</span>
        }
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return <div className={'flex gap-2'}>
                <Button variant={'link'} onClick={() => router.get(route('dashboard.products.edit', { product: row.original.id }))}><Edit className={'w-4 h-4'}/></Button>
                <ConfirmationButton variant={"destructive"} onConfirm={() => router.delete(route('dashboard.products.delete', { product: row.original.id }))}>
                    <Trash className={'w-4 h-4'}/>
                </ConfirmationButton>
            </div>
        }
    }
]


type ProductsProps = {
    products: PaginatedResponse<Product>;
}

const Products = ({ products }: ProductsProps) => {
    const url = new URL(window.location.href);
    const [searchTerm, setSearchTerm] = useState<string>(url.searchParams.get('filter[name]') || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(route('dashboard.products.index'), {
            'filter[name]': searchTerm
        }, {
            preserveState: true,
            only: ['products']
        });
    }

    return <DashboardLayout breadcrumbs={breadcrumbs}>
        <Head title={"Productos"} />

        <div className={'p-5'}>
            <div className={'flex items-center justify-between w-full'}>
                <h1 className={'text-2xl font-bold mb-5'}>Productos</h1>
            </div>

            <div className="mb-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button type="submit">Buscar</Button>
                    <Link href={route('dashboard.products.create')} prefetch>
                        <Button type={"button"}>
                            <Plus className={'w-4 h-4'}/>
                        </Button>
                    </Link>
                </form>
            </div>

            <PaginatedDataTable
                columns={columns}
                data={products}
            />
        </div>
    </DashboardLayout>
}

export default Products;
