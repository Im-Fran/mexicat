import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/ui/form';
import { FormEvent } from 'react';

type EditCustomerProps = {
    customer: User;
}

const EditCustomer = ({ customer }: EditCustomerProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Panel de Control',
            href: route('dashboard.overview'),
        },
        {
            title: 'Clientes',
            href: route('dashboard.customers.index'),
        },
        {
            title: 'Editar Cliente',
            href: route('dashboard.customers.edit', { customer: customer.id }),
        },
    ];

    const { data, setData, patch, processing, errors } = useForm({
        name: customer.name,
        email: customer.email,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch(route('dashboard.customers.update', { customer: customer.id }));
    };

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Cliente" />

            <div className="p-5">
                <h1 className="text-2xl font-bold mb-5">Editar Cliente</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Información del Cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nombre del cliente"
                                        required
                                    />
                                    {errors.name && <FormMessage>{errors.name}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Email del cliente"
                                        required
                                        disabled
                                    />
                                    {errors.email && <FormMessage>{errors.email}</FormMessage>}
                                </div>
                            </div>

                            {customer.addresses && customer.addresses.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium mb-2">Direcciones</h3>
                                    <div className="border rounded-md p-4">
                                        <div className="text-sm text-gray-500">
                                            {`El cliente tiene ${customer.addresses.length} dirección(es) registrada(s)`}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-2 pt-4">
                                <Link href={route('dashboard.customers.index')}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    Actualizar Cliente
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditCustomer;
