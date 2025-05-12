import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem, Permission } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/ui/form';
import { FormEvent, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type CreateRoleProps = {
    permissions: Permission[];
}

const CreateRole = ({ permissions }: CreateRoleProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Panel de Control',
            href: route('dashboard.overview'),
        },
        {
            title: 'Roles',
            href: route('dashboard.roles.index'),
        },
        {
            title: 'Crear Rol',
            href: route('dashboard.roles.create'),
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as number[],
    });

    const groupedPermissions = permissions.reduce((groups, permission) => {
        // Handle wildcard permission separately
        if (permission.name === '*') {
            if (!groups['global']) {
                groups['global'] = [];
            }
            groups['global'].push(permission);
            return groups;
        }

        // Split permission name into segments
        const parts = permission.name.split('.');

        // Handle basic grouping like dashboard.overview
        if (parts.length <= 2) {
            const group = 'general';
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(permission);
            return groups;
        }

        // For more complex permissions like dashboard.products.index
        const group = `${parts[0]}.${parts[1]}`; // e.g., "dashboard.products"
        if (!groups[group]) {
            groups[group] = [];
        }

        groups[group].push(permission);
        return groups;
    }, {} as Record<string, Permission[]>);

    const handlePermissionToggle = (permissionId: number) => {
        if (data.permissions.includes(permissionId)) {
            setData('permissions', data.permissions.filter(id => id !== permissionId));
        } else {
            setData('permissions', [...data.permissions, permissionId]);
        }
    };

    const handleGroupToggle = (permissions: Permission[]) => {
        const permissionIds = permissions.map(p => p.id);

        // Check if all permissions in this group are already selected
        const allSelected = permissionIds.every(id => data.permissions.includes(id));

        if (allSelected) {
            // Remove all permissions from this group
            setData('permissions', data.permissions.filter(id => !permissionIds.includes(id)));
        } else {
            // Add all permissions from this group that aren't already selected
            const newPermissions = [
                ...data.permissions,
                ...permissionIds.filter(id => !data.permissions.includes(id))
            ];
            setData('permissions', newPermissions);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('dashboard.roles.store'));
    };

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Rol" />

            <div className="p-5">
                <h1 className="text-2xl font-bold mb-5">Crear Rol</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Información del Rol</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Nombre del rol"
                                    required
                                />
                                {errors.name && <FormMessage>{errors.name}</FormMessage>}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Permisos</h3>

                                {Object.entries(groupedPermissions).map(([group, groupPermissions]) => (
                                    <div key={group} className="border rounded-md p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Checkbox
                                                id={`group-${group}`}
                                                checked={groupPermissions.every(p => data.permissions.includes(p.id))}
                                                onCheckedChange={() => handleGroupToggle(groupPermissions)}
                                            />
                                            <Label
                                                htmlFor={`group-${group}`}
                                                className="text-md font-medium cursor-pointer"
                                            >
                                                {group}
                                            </Label>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-6">
                                            {groupPermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`permission-${permission.id}`}
                                                        checked={data.permissions.includes(permission.id)}
                                                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                                                    />
                                                    <Label
                                                        htmlFor={`permission-${permission.id}`}
                                                        className="text-sm cursor-pointer"
                                                    >
                                                        {(() => {
                                                            const parts = permission.name.split('.');
                                                            if (permission.name === '*') return 'All Permissions';
                                                            if (parts.length <= 2) return permission.name;
                                                            // Show only the action part (index, create, edit.*, etc.)
                                                            return parts.slice(2).join('.');
                                                        })()}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errors.permissions && <FormMessage>{errors.permissions}</FormMessage>}

                            <div className="flex justify-end gap-2 pt-4">
                                <Link href={route('dashboard.roles.index')}>
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    Crear Rol
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateRole;
