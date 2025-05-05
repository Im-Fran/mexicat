import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { BreadcrumbItem, Product } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/ui/form';
import { FormEvent } from 'react';

type EditProductProps = {
    product: Product;
}

const EditProduct = ({ product }: EditProductProps) => {
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
            title: 'Editar Producto',
            href: `/dashboard/products/edit/${product.id}`,
        },
    ];

    const { data, setData, patch, processing, errors } = useForm({
        name: product.name,
        sku: product.sku || '',
        barcode: product.barcode || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch(route('dashboard.products.update', { product: product.id }));
    };

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Producto" />

            <div className="p-5">
                <h1 className="text-2xl font-bold mb-5">Editar Producto</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Información del Producto</CardTitle>
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
                                        placeholder="Nombre del producto"
                                        required
                                    />
                                    {errors.name && <FormMessage>{errors.name}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id="sku"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        placeholder="SKU del producto"
                                    />
                                    {errors.sku && <FormMessage>{errors.sku}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="barcode">Código de Barras</Label>
                                    <Input
                                        id="barcode"
                                        value={data.barcode}
                                        onChange={(e) => setData('barcode', e.target.value)}
                                        placeholder="Código de barras"
                                    />
                                    {errors.barcode && <FormMessage>{errors.barcode}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="0.00"
                                        required
                                    />
                                    {errors.price && <FormMessage>{errors.price}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min="0"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        placeholder="0"
                                        required
                                    />
                                    {errors.stock && <FormMessage>{errors.stock}</FormMessage>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Actualizar Producto
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditProduct;
