import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/types';
import { router } from '@inertiajs/react';
import { ArchiveIcon, ArchiveXIcon, ShoppingCart } from 'lucide-react';
import { currency } from '@/lib/utils';

export const ProductCard = ({ product }: { product: Product }) => {
    const addToCart = () => router.post(route('cart.add'), { productId: product.id, quantity: 1 }, {
        preserveScroll: true,
    });

    return (
        <Card className="flex flex-col overflow-hidden pt-0">
            <div className="aspect-square overflow-hidden">
                <img
                    src={product.media?.[0]?.original_url || '#'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                />
            </div>

            <CardContent className="flex-1 pt-4">
                <div className="mb-2 flex items-start justify-between">
                    <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>
                    <p className="text-primary font-bold">{currency(product.price)}</p>
                </div>

                <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">{product.description}</p>
            </CardContent>

            <CardFooter className="pt-0">
                <div className="flex w-full justify-between">
                    <Button size={"sm"} onClick={(e) => {e.preventDefault();e.stopPropagation();}} className="self-center cursor-default" variant={product.stock > 0 ? 'default' : 'destructive'}>
                        {product.stock > 0 ? <ArchiveIcon className={"w-8 h-8"}/> : <ArchiveXIcon className={"w-8 h-8"}/>}
                        {product.stock}
                    </Button>

                    <Button size={"sm"} disabled={product.stock <= 0} onClick={addToCart}>
                        <ShoppingCart className="h-4 w-4" />
                        Agregar
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
