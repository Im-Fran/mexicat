import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AccountLayout from '@/layouts/account/layout';
import { BreadcrumbItem, Address, Region, Country } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Trash2Icon, PencilIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ConfirmationButton from '@/components/confirmation-button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cuenta', href: route('account.index') },
    { title: 'Direcciones', href: route('account.addresses') },
];

type AddressForm = {
    id?: number;
    name: string;
    street: string;
    city: string;
    region: string;
    country: string;
    postal_code: string;
    is_default: boolean;
};

type AddressesPageProps = {
    addresses: Address[];
    regions: Region[];
    countries: Country[];
};

export default function AddressesPage({ addresses, regions, countries }: AddressesPageProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm<AddressForm>('EditAddress', {
        id: undefined,
        name: '',
        street: '',
        city: '',
        region: regions.find(it => it.name === 'Metropolitana de Santiago')?.id?.toString() || '',
        country: 'CHL',
        postal_code: '',
        is_default: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const toastId = toast.loading(editingId ? 'Actualizando dirección...' : 'Agregando dirección...');

        const endpoint = editingId ? route('account.addresses.update', editingId) : route('account.addresses.store');

        form.submit(isEditing ? 'patch' : 'post', endpoint, {
            onSuccess: () => {
                toast.success(editingId ? 'Dirección actualizada!' : 'Dirección agregada!', {
                    id: toastId,
                });
                resetForm();
            },
            onError: () => {
                toast.error('Hubo un problema al guardar la dirección.', {
                    id: toastId,
                });
            },
        });
    };

    const editAddress = (address: Address) => {
        setIsEditing(true);
        setEditingId(address.id);
        form.setData({
            id: address.id,
            name: address.name,
            street: address.street,
            city: address.city,
            region: address.region,
            country: address.country,
            postal_code: address.postal_code,
            is_default: address.is_default,
        });
    };

    const deleteAddress = (id: number) => {
        const toastId = toast.loading('Eliminando dirección...');

        form.delete(route('account.addresses.destroy', id), {
            onSuccess: () => {
                toast.success('Dirección eliminada!', {
                    id: toastId,
                });
            },
            onError: () => {
                toast.error('Hubo un problema al eliminar la dirección.', {
                    id: toastId,
                });
            },
        });
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        form.reset();
        form.clearErrors();
    };

    return (
        <AccountLayout breadcrumbs={breadcrumbs}>
            <Head title="Direcciones" />

            <div className="flex flex-col space-y-6">
                <Heading title="Direcciones" description="Administra las direcciones asociadas a tu cuenta." />

                <Card>
                    <CardHeader>
                        <CardTitle>{isEditing ? 'Editar dirección' : 'Agregar dirección'}</CardTitle>
                        <CardDescription>
                            {isEditing
                                ? 'Modifica los datos de tu dirección.'
                                : 'Agrega una nueva dirección a tu cuenta.'}
                        </CardDescription>
                    </CardHeader>

                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre de la dirección</Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    placeholder="Ej: Casa, Oficina, etc."
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Dirección</Label>
                                <Textarea
                                    id="address"
                                    value={form.data.street}
                                    onChange={(e) => form.setData('street', e.target.value)}
                                    placeholder="Calle, Número, Comuna"
                                />
                                <InputError message={form.errors.street} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                                {/*<div className="space-y-2">*/}
                                {/*    <Label htmlFor="country">País</Label>*/}
                                {/*    <Select onValueChange={(value) => form.setData('country', value)} value={form.data.country}>*/}
                                {/*        <SelectTrigger id="country">*/}
                                {/*            <SelectValue placeholder="Selecciona un país" />*/}
                                {/*        </SelectTrigger>*/}
                                {/*        <SelectContent>*/}
                                {/*            {countries.map(it => <SelectItem key={it.iso3} value={it.iso3}>{it.name} ({it.iso3})</SelectItem>)}*/}
                                {/*        </SelectContent>*/}
                                {/*    </Select>*/}
                                {/*    <InputError message={form.errors.country} />*/}
                                {/*</div>*/}
                                <div className="space-y-2">
                                    <Label htmlFor="region">Región</Label>
                                    <Select onValueChange={(value) => form.setData('region', value)} value={form.data.region}>
                                        <SelectTrigger id="region">
                                            <SelectValue placeholder="Selecciona una región" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {regions.map(it => <SelectItem value={it.id.toString()}>{it.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={form.errors.region} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">Ciudad</Label>
                                <Input
                                    id="city"
                                    value={form.data.city}
                                    onChange={(e) => form.setData('city', e.target.value)}
                                    placeholder="Ciudad"
                                />
                                <InputError message={form.errors.city} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postal_code">Código Postal</Label>
                                <Input
                                    id="postal_code"
                                    value={form.data.postal_code}
                                    onChange={(e) => form.setData('postal_code', e.target.value)}
                                    placeholder="Código postal"
                                />
                                <InputError message={form.errors.postal_code}/>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            {isEditing ? (
                                <Button variant="outline" type="button" onClick={resetForm}>
                                    Cancelar
                                </Button>
                            ) : (
                                <div />
                            )}

                            <Button type="submit" disabled={form.processing}>
                                {form.processing
                                    ? 'Guardando...'
                                    : (isEditing ? 'Actualizar dirección' : 'Agregar dirección')}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {addresses.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Mis direcciones</CardTitle>
                            <CardDescription>Listado de direcciones asociadas a tu cuenta.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {addresses.map((address) => (
                                    <div key={address.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{address.name}</span>
                                                {address.is_default ? (
                                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                                        Predeterminada
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => editAddress(address)}
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Button>
                                                <ConfirmationButton
                                                    variant={'ghost'}
                                                    size={'icon'}
                                                    onConfirm={() => deleteAddress(address.id)}
                                                    dialogTitle={'Eliminar Dirección'}
                                                    confirmMessage={'¿Estás seguro de que deseas eliminar esta dirección?'}
                                                >
                                                    <Trash2Icon className="h-4 w-4" />
                                                </ConfirmationButton>
                                            </div>
                                        </div>
                                        <p className="text-sm">{address.street}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {address.city}, {regions.find(it => it.id.toString() === address.region)?.name}, C.P. {address.postal_code}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AccountLayout>
    );
}
