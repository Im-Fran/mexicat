import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GuestLayout } from '@/layouts/guest/guest-layout';
import { currency } from '@/lib/utils';
import { BreadcrumbItem, CartItem, Region } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { HandCoins } from 'lucide-react';
import { FormEvent } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';

type CheckoutProps = {
    cartItems: CartItem[];
    total: number;
    regions: Region[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: route('products.index'),
    },
    {
        title: 'Carrito de Compras',
        href: route('cart.index')
    },
    {
        title: 'Finalizar Compra',
        href: route('cart.checkout')
    }
]

const CheckoutPage = ({ cartItems, total, regions }: CheckoutProps) => {
    const { data, setData, post, processing, errors } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        region: regions.find(it => it.name === 'Metropolitana de Santiago')?.id?.toString() || '',
        paymentMethod: 'transfer',
        notes: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    if (cartItems.length === 0) {
        return (
            <GuestLayout>
                <Head title="Checkout" />
                <div className="container mx-auto py-8">
                    <div className="flex flex-col items-center justify-center py-12">
                        <h2 className="mb-4 text-xl font-semibold">Tu carrito está vacío</h2>
                        <p className="text-muted-foreground mb-6">No puedes proceder al pago sin productos</p>
                        <Link href={route('products.index')}>
                            <Button>Ver productos</Button>
                        </Link>
                    </div>
                </div>
            </GuestLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title="Checkout" />

            <div className="container mx-auto py-8 space-y-4">
                <Breadcrumbs breadcrumbs={breadcrumbs}/>

                <h1 className="mb-6 text-3xl font-bold">Finalizar Compra</h1>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                    <div className="md:col-span-8">
                        <Card>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex flex-col space-y-2">
                                            <Label htmlFor="firstName">Nombre</Label>
                                            <Input
                                                id="firstName"
                                                value={data.firstName}
                                                onChange={(e) => setData('firstName', e.target.value)}
                                                placeholder="Juan"
                                                required
                                            />
                                            {errors.firstName && <FormMessage>{errors.firstName}</FormMessage>}
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <Label htmlFor="lastName">Apellido</Label>
                                            <Input
                                                id="lastName"
                                                value={data.lastName}
                                                onChange={(e) => setData('lastName', e.target.value)}
                                                placeholder="Pérez"
                                                required
                                            />
                                            {errors.lastName && <FormMessage>{errors.lastName}</FormMessage>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex flex-col space-y-2">
                                            <Label htmlFor="email">Correo electrónico</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="correo@ejemplo.com"
                                                required
                                            />
                                            {errors.email && <FormMessage>{errors.email}</FormMessage>}
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <Label htmlFor="phone">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+56 9 1234 5678"
                                                required
                                            />
                                            {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="address">Dirección</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Calle Ejemplo 123"
                                            required
                                        />
                                        {errors.address && <FormMessage>{errors.address}</FormMessage>}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex flex-col space-y-2">
                                            <Label htmlFor="city">Ciudad</Label>
                                            <Input
                                                id="city"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                placeholder="Santiago"
                                                required
                                            />
                                            {errors.city && <FormMessage>{errors.city}</FormMessage>}
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <Label htmlFor="region">Región</Label>
                                            <Select onValueChange={(value) => setData('region', value)} value={data.region}>
                                                <SelectTrigger id="region">
                                                    <SelectValue placeholder="Selecciona una región" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {regions.map(it => <SelectItem value={it.id.toString()}>{it.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            {errors.region && <FormMessage>{errors.region}</FormMessage>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <Label>Método de pago</Label>
                                        <RadioGroup
                                            value={data.paymentMethod}
                                            onValueChange={(value) => setData('paymentMethod', value)}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center space-x-2 rounded-md border p-3">
                                                <RadioGroupItem value="transfer" id="transfer" />
                                                <Label className="font-normal" htmlFor="transfer">
                                                    <div className={"flex items-center gap-2"}>
                                                        <HandCoins className="h-4 w-4" />
                                                        Transferencia bancaria
                                                    </div>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                        {errors.paymentMethod && <FormMessage>{errors.paymentMethod}</FormMessage>}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="notes">Notas del pedido (opcional)</Label>
                                        <Textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Instrucciones especiales para la entrega..."
                                        />
                                        {errors.notes && <FormMessage>{errors.notes}</FormMessage>}
                                    </div>

                                    <Button type="submit" className="w-full" disabled={processing}>
                                        Completar pedido
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-4">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-semibold">Resumen del pedido</h3>

                                <div className="mb-4 space-y-3">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between">
                                            <span className="flex-1">
                                                {item.name} <span className="text-muted-foreground">× {item.cartQuantity}</span>
                                            </span>
                                            <span>{currency(item.price * item.cartQuantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-2 flex justify-between border-b pb-2">
                                    <span>Subtotal</span>
                                    <span>{currency(total)}</span>
                                </div>
                                <div className="mb-2 flex justify-between border-b pb-2">
                                    <span>Envío</span>
                                    <span>Por calcular</span>
                                </div>
                                <div className="mb-4 flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>{currency(total)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default CheckoutPage;
