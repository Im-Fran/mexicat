import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as Dialog from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard.overview'),
    },
    {
        title: 'Productos',
        href: route('dashboard.products.index'),
    },
    {
        title: 'Crear Producto',
        href: route('dashboard.products.create'),
    },
];

type FormValues = {
    name: string;
    sku: string;
    barcode: string;
    price: string;
    stock: string;
    images: File[];
};

const CreateProduct = () => {
    const inertiaForm = useForm<FormValues>('dashboard.product.create', {
        name: 'Peloneta',
        sku: 'PELONETA',
        barcode: '3142563789',
        price: '1500',
        stock: '12',
        images: [],
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        inertiaForm.post(route('dashboard.products.store'));
    };

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
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id={'name'}
                                        name={'name'}
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Nombre del producto"
                                        value={inertiaForm.data.name}
                                        onChange={(e) => inertiaForm.setData('name', e.target.value)}
                                    />
                                    {inertiaForm.errors.name && <p className="text-destructive text-sm">{inertiaForm.errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id={'sku'}
                                        name={'sku'}
                                        type="text"
                                        autoComplete="off"
                                        placeholder="SKU del producto"
                                        value={inertiaForm.data.sku}
                                        onChange={(e) => inertiaForm.setData('sku', e.target.value)}
                                    />
                                    {inertiaForm.errors.sku && <p className="text-destructive text-sm">{inertiaForm.errors.sku}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="barcode">Código de Barras</Label>
                                    <div className={'flex gap-2'}>
                                        <Input
                                            id={'barcode'}
                                            name={'barcode'}
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Código de barras"
                                            value={inertiaForm.data.barcode}
                                            onChange={(e) => inertiaForm.setData('barcode', e.target.value)}
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
                                                <div className={'mt-4 flex justify-center'}>
                                                    <div id="interactive" className="h-64 w-full bg-gray-200">
                                                        <p className="text-center">Escanea un código de barras</p>
                                                    </div>
                                                </div>
                                                <Dialog.DialogClose asChild>
                                                    <Button variant="secondary">Cerrar</Button>
                                                </Dialog.DialogClose>
                                            </Dialog.DialogContent>
                                        </Dialog.Dialog>
                                    </div>
                                    {inertiaForm.errors.barcode && <p className="text-destructive text-sm">{inertiaForm.errors.barcode}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="price">Precio</Label>
                                    <Input
                                        id={'price'}
                                        name={'price'}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        value={inertiaForm.data.price}
                                        onChange={(e) => inertiaForm.setData('price', e.target.value)}
                                    />
                                    {inertiaForm.errors.price && <p className="text-destructive text-sm">{inertiaForm.errors.price}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id={'stock'}
                                        name={'stock'}
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={inertiaForm.data.stock}
                                        onChange={(e) => inertiaForm.setData('stock', e.target.value)}
                                    />
                                    {inertiaForm.errors.stock && <p className="text-destructive text-sm">{inertiaForm.errors.stock}</p>}
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <Label htmlFor="images">Imágenes</Label>
                                    <div className="mt-2 space-y-3">
                                        <div className="flex flex-wrap gap-4">
                                            {inertiaForm.data.images &&
                                                Array.from(inertiaForm.data.images).map((image, index) => (
                                                    <div key={index} className="group relative">
                                                        <div className="h-32 w-32 overflow-hidden rounded-md border">
                                                            <img
                                                                src={URL.createObjectURL(image)}
                                                                alt={`Preview ${index}`}
                                                                className="h-full w-full object-cover"
                                                                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                                            />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            className="absolute -top-2 -right-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                                            onClick={() => {
                                                                const newImages = Array.from(inertiaForm.data.images || []).filter(
                                                                    (_, i) => i !== index,
                                                                );
                                                                inertiaForm.setData('images', newImages);
                                                            }}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                        {(inertiaForm.errors as Record<string, string>)[`images.${index}`] && (
                                                            <p className="text-destructive mt-2 w-32 text-start text-sm">
                                                                {(inertiaForm.errors as Record<string, string>)[`images.${index}`]}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                        <div>
                                            <Input
                                                id="images"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                multiple
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        const existingImages = Array.from(inertiaForm.data.images || []);
                                                        const newImages = Array.from(e.target.files);
                                                        inertiaForm.setData('images', [...existingImages, ...newImages]);
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                            <Button type="button" variant="outline" onClick={() => document.getElementById('images')?.click()}>
                                                Agregar Imagen
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Link href={route('dashboard.products.index')}><Button type="button" variant="outline">Cancelar</Button></Link>
                                <Button type="submit" disabled={inertiaForm.processing}>
                                    Guardar Producto
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateProduct;
