import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AccountLayout from '@/layouts/account/layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ExternalLinkIcon } from 'lucide-react';
import { FormEvent  } from 'react';
import toast from 'react-hot-toast';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cuenta', href: route('account.index') },
    { title: 'Perfil', href: route('account.index') },
];

type ProfileForm = {
    name: string;
}

type ProfilePageProps = {
    user: User;
};

export default function ProfilePage({ user }: ProfilePageProps) {
    const form = useForm<ProfileForm>(`EditProfile`, {
        name: user.name,
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation()

        const toastId = toast.loading('Actualizando tu perfil...');

        form.patch(route('account.update'), {
            onSuccess: () => {
                toast.success('Tu perfil ha sido actualizado!', {
                    id: toastId,
                });
            },
            onError: () => {
                toast.error('Hubo un problema al actualizar tu perfil.', {
                    id: toastId,
                });
            },
            onCancel: () => {
                toast.error('Actualización cancelada.', {
                    id: toastId,
                });
            },
        })
    };

    // Open WorkOS account manager in new tab
    const openWorkOSManager = () => {
        window.open(route('workos.account-manager'), '_blank');
    };

    return (
        <AccountLayout breadcrumbs={breadcrumbs}>
            <Head title={"Perfil"}/>

            <div className="flex flex-col space-y-6">
                <Heading title="Perfil" description="Actualiza tu información personal y preferencias." />

                <Card>
                    <CardHeader>
                        <CardTitle>Datos personales</CardTitle>
                        <CardDescription>Modifica los datos básicos de tu cuenta.</CardDescription>
                    </CardHeader>

                    <form className={"space-y-10"} onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Tu nombre" />
                                <InputError message={form.errors.name}/>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button variant="outline" type="button" onClick={openWorkOSManager}>
                                Administrar Cuenta en WorkOS
                                <ExternalLinkIcon className="ml-2 h-4 w-4" />
                            </Button>

                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Guardando...' : 'Guardar cambios'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AccountLayout>
    );
}
