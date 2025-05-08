import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormProvider, useForm as useReactHookForm } from 'react-hook-form';
import { Camera } from 'lucide-react';
import * as Dialog from '@/components/ui/dialog';
import Quagga from 'quagga';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: '/dashboard',
    },
    {
        title: 'Productos',
        href: '/dashboard/products',
    },
    {
        title: 'Crear Producto',
        href: '/dashboard/products/create',
    },
];

const CreateProduct = () => {
    const inertiaForm = useForm({
        name: '',
        sku: '',
        barcode: '',
        price: '',
        stock: '',
    });

    const form = useReactHookForm({
        defaultValues: {
            name: '',
            sku: '',
            barcode: '',
            price: '',
            stock: '',
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        inertiaForm.post(route('dashboard.products.store'));
    });

    const openBarcodeScanner = () => {
        window.Quagga = Quagga
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    facingMode: 'environment',
                },
                target: document.getElementById('interactive'),
            },
            decoder: {
                readers: ['ean_reader'],
            },
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((data: unknown) => {
            console.log({
                msg: 'Quagga',
                data
            })
            const code = data.codeResult.code;
            inertiaForm.setData('barcode', code);
            Quagga.stop();
        });
    }

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Producto" />

            <div className="p-5">
                <h1 className="mb-5 text-2xl font-bold">Crear Producto</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Información del Producto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormProvider {...form}>
                            <form onSubmit={onSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="name">Nombre</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nombre del producto"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            inertiaForm.setData('name', e.target.value);
                                                        }}
                                                    />
                                                </FormControl>
                                                {inertiaForm.errors.name && <p className="text-destructive text-sm">{inertiaForm.errors.name}</p>}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="sku"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="sku">SKU</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="SKU del producto"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            inertiaForm.setData('sku', e.target.value);
                                                        }}
                                                    />
                                                </FormControl>
                                                {inertiaForm.errors.sku && <p className="text-destructive text-sm">{inertiaForm.errors.sku}</p>}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="barcode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="barcode">Código de Barras</FormLabel>
                                                <FormControl>
                                                    <div className={'flex gap-2'}>
                                                        <Input
                                                            placeholder="Código de barras"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                inertiaForm.setData('barcode', e.target.value);
                                                            }}
                                                        />
                                                        <Dialog.Dialog>
                                                            <Dialog.DialogTrigger asChild>
                                                                {/*<Button onClick={openBarcodeScanner} variant={'outline'} type={'button'}>*/}
                                                                {/*    <Camera className={'w-6 h-6'}/>*/}
                                                                {/*</Button>*/}
                                                            </Dialog.DialogTrigger>

                                                            <Dialog.DialogContent>
                                                                <Dialog.DialogTitle>Escáner de Código de Barras</Dialog.DialogTitle>
                                                                <Dialog.DialogDescription>
                                                                    Escanea un código de barras para agregarlo al producto.
                                                                </Dialog.DialogDescription>
                                                                <div className={'flex justify-center mt-4'}>
                                                                    <div id="interactive" className="w-full h-64 bg-gray-200">
                                                                        <p className="text-center">Escanea un código de barras</p>
                                                                    </div>
                                                                </div>
                                                                <Dialog.DialogClose asChild>
                                                                    <Button variant="secondary">Cerrar</Button>
                                                                </Dialog.DialogClose>
                                                            </Dialog.DialogContent>
                                                        </Dialog.Dialog>
                                                    </div>
                                                </FormControl>
                                                {inertiaForm.errors.barcode && (
                                                    <p className="text-destructive text-sm">{inertiaForm.errors.barcode}</p>
                                                )}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="price">Precio</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            inertiaForm.setData('price', e.target.value);
                                                        }}
                                                    />
                                                </FormControl>
                                                {inertiaForm.errors.price && <p className="text-destructive text-sm">{inertiaForm.errors.price}</p>}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="stock">Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            inertiaForm.setData('stock', e.target.value);
                                                        }}
                                                    />
                                                </FormControl>
                                                {inertiaForm.errors.stock && <p className="text-destructive text-sm">{inertiaForm.errors.stock}</p>}
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={inertiaForm.processing}>
                                        Guardar Producto
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateProduct;
