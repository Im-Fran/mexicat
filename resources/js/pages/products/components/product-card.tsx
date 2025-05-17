import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product }: { product: Product }) => <Card className="flex flex-col overflow-hidden pt-0">
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
            <p className="text-primary font-bold">${product.price.toLocaleString('es-CL')}</p>
        </div>

        <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">{product.description}</p>
    </CardContent>

    <CardFooter className="pt-0">
        <div className="flex w-full justify-between">
            <Badge className="self-center" variant={product.stock > 0 ? 'default' : 'destructive'}>
                {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </Badge>

            <Button disabled={product.stock <= 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar
            </Button>
        </div>
    </CardFooter>
</Card>
