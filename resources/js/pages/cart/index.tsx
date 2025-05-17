import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GuestLayout } from '@/layouts/guest/guest-layout';
import { Head, Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '@/pages/cart/components/cart/cart-item';
import {BreadcrumbItem, CartItem as CartItemType} from '@/types';
import {currency} from "@/lib/utils";
import {Breadcrumbs} from "@/components/breadcrumbs";

type CartProps = {
  cartItems: CartItemType[];
  total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Productos',
    href: route('products.index'),
  },
  {
    title: 'Carrito de Compras',
    href: route('cart.index'),
  },
]

const CartPage = ({ cartItems, total }: CartProps) => {

  return (
    <GuestLayout>
      <Head title="Carrito de Compras" />

      <div className="container mx-auto py-8 space-y-4">
        <Breadcrumbs breadcrumbs={breadcrumbs}/>

        <h1 className="mb-6 text-3xl font-bold">Carrito de Compras</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              {cartItems.map((item ) => <CartItem key={`cart-item-${item.id}`} item={item}/>)}
            </div>

            <div className="md:col-span-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Resumen de compra</h3>
                  <div className="mb-4 flex justify-between border-b pb-4">
                    <span>Subtotal</span>
                    <span>{currency(total)}</span>
                  </div>
                  <div className="mb-4 flex justify-between border-b pb-4">
                    <span>Envío</span>
                    <span>Por calcular</span>
                  </div>
                  <div className="mb-6 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{currency(total)}</span>
                  </div>
                  <Link href={route('cart.checkout')}>
                    <Button className="w-full">Proceder al pago</Button>
                  </Link>
                  <Link href={route('products.index')}>
                    <Button variant="outline" className="mt-2 w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Seguir comprando
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="text-muted-foreground mb-4 h-16 w-16" />
            <h2 className="mb-2 text-xl font-semibold">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">Agrega algunos productos para comenzar</p>
            <Link href={route('products.index')}>
              <Button>Ver productos</Button>
            </Link>
          </div>
        )}
      </div>
    </GuestLayout>
  );
};

export default CartPage;
