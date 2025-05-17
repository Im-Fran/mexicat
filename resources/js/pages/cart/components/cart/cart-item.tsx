import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoaderIcon, Minus, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { CartItem as CartItemType } from '@/types';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { currency } from '@/lib/utils';
import { useState } from 'react';

export const CartItem = ({ item }: { item: CartItemType }) => {
    const [updating, setUpdating] = useState(false);

    const updateQuantity = (productId: number, quantity: number) => {
        if(updating) return;
        router.post(route('cart.update'), { productId, quantity }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Carrito actualizado');
            },
            onBefore: () => setUpdating(true),
            onFinish: () => setUpdating(false),
        });
    };

    const removeItem = (productId: number) => {
        if(updating) return;
        router.post(route('cart.remove'), { productId }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Producto eliminado del carrito');
            },
            onBefore: () => setUpdating(true),
            onFinish: () => setUpdating(false),
        });
    };

    return (
        <Card key={item.id} className="mb-4">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded">
                        <img src={item.media?.[0]?.original_url || '#'} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">{currency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.cartQuantity - 1))}
                            disabled={item.cartQuantity <= 1 || updating}
                        >
                            {updating ? <LoaderIcon className={"w-4 h-4 animate-spin"}/> : <Minus className="h-4 w-4" />}
                        </Button>
                        <Input
                            type="number"
                            min="1"
                            value={item.cartQuantity}
                            disabled={updating}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (val >= 1) updateQuantity(item.id, val);
                            }}
                            className="no-spinner w-16 text-center"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                            disabled={item.cartQuantity >= item.stock || updating}
                        >
                            {updating ? <LoaderIcon className={"w-4 h-4 animate-spin"}/> : <Plus className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">{currency(item.price * item.cartQuantity)}</p>
                        <Button disabled={updating} variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="mr-1 h-4 w-4" />
                            Eliminar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
