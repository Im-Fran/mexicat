import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem, PaginatedResponse, Permission } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Column, ColumnDef } from '@tanstack/react-table';
import { PaginatedDataTable } from '@/components/data-table/paginated-data-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Plus, Search, Trash } from 'lucide-react';
import dayjs from 'dayjs';
import ConfirmationButton from '@/components/confirmation-button';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/ui/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard.overview'),
    },
    {
        title: 'Permisos',
        href: route('dashboard.permissions.index'),
    },
];

const getSortDirection = (column: Column<Permission>) => {
    const sort = new URL(window.location.href).searchParams.get('sort') || '';
    if (sort === column.id) {
        return 'asc';
    } else if (sort === `-${column.id}`) {
        return 'desc';
    }
    return 'asc';
};

const toggleSort = (column: Column<Permission>) => {
    router.reload({
        data: { sort: getSortDirection(column) === 'asc' ? `-${column.id}` : column.id },
        only: ['permissions'],
    });
};

type PermissionsProps = {
    permissions: PaginatedResponse<Permission>;
};

const Permissions = ({ permissions }: PermissionsProps) => {
    const url = new URL(window.location.href);
    const [searchTerm, setSearchTerm] = useState<string>(url.searchParams.get('filter[name]') || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

    const createForm = useForm({
        name: '',
    });

    const editForm = useForm({
        name: '',
    });

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            route('dashboard.permissions.index'),
            {
                'filter[name]': searchTerm,
            },
            {
                preserveState: true,
                only: ['permissions'],
            },
        );
    };

    const openCreateModal = () => {
        createForm.reset();
        setIsCreateModalOpen(true);
    };

    const submitCreateForm = (e: FormEvent) => {
        e.preventDefault();
        createForm.post(route('dashboard.permissions.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
            },
        });
    };

    const openEditModal = (permission: Permission) => {
        setSelectedPermission(permission);
        editForm.setData('name', permission.name);
        setIsEditModalOpen(true);
    };

    const submitEditForm = (e: FormEvent) => {
        e.preventDefault();
        if (selectedPermission) {
            editForm.put(route('dashboard.permissions.update', { permission: selectedPermission.id }), {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                },
            });
        }
    };

    const columns: ColumnDef<Permission>[] = [
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
                        <Button variant={'link'} onClick={() => openEditModal(row.original)}>
                            <Edit className={'h-4 w-4'} />
                        </Button>
                        <ConfirmationButton
                            variant={'destructive'}
                            onConfirm={() => router.delete(route('dashboard.permissions.destroy', { permission: row.original.id }))}
                        >
                            <Trash className={'h-4 w-4'} />
                        </ConfirmationButton>
                    </div>
                );
            },
        },
    ];

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title={'Permisos'} />

            <div className={'p-5'}>
                <div className={'flex w-full items-center justify-between'}>
                    <h1 className={'mb-5 text-2xl font-bold'}>Permisos</h1>
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
                        <Button type="button" onClick={openCreateModal}>
                            <Plus className={'h-4 w-4'} />
                        </Button>
                    </form>
                </div>

                <PaginatedDataTable columns={columns} data={permissions} />
            </div>

            {/* Create Permission Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Permiso</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitCreateForm} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="create-name">Nombre</Label>
                            <Input
                                id="create-name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="Nombre del permiso"
                                required
                            />
                            {createForm.errors.name && <FormMessage>{createForm.errors.name}</FormMessage>}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreateModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={createForm.processing}>
                                Crear
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Permission Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Permiso</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEditForm} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Nombre</Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                placeholder="Nombre del permiso"
                                required
                            />
                            {editForm.errors.name && <FormMessage>{editForm.errors.name}</FormMessage>}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                Actualizar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default Permissions;
