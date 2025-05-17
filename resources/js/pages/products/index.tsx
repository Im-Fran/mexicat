import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product, PaginatedResponse } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { GuestLayout } from '@/layouts/guest/guest-layout';
import { ProductCard } from '@/pages/products/components/product-card';
import { useSearchParam } from 'react-use';

type ProductIndexProps = {
    products: PaginatedResponse<Product>;
};

const ProductIndex = ({ products }: ProductIndexProps) => {
    const searchParam = useSearchParam('filter[name]');
    const [searchTerm, setSearchTerm] = useState(searchParam || '');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Handle the search term change with debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Update URL when debounced search term changes
    useEffect(() => {
        if (debouncedSearchTerm !== (searchParam || '')) {
            router.get(
                window.location.pathname,
                debouncedSearchTerm ? { 'filter[name]': debouncedSearchTerm } : {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['products'],
                    replace: true
                }
            );
        }
    }, [debouncedSearchTerm, searchParam]);

    return (
        <GuestLayout>
            <Head title="Productos" />

            <div className="container mx-auto py-8">
                <h1 className="mb-6 text-3xl font-bold">Nuestros Productos</h1>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                        <Input
                            placeholder="Buscar productos..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Products Grid */}
                {products.total > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.data.map((product) => <ProductCard key={`product-card-${product.id}`} product={product} />)}
                    </div>
                ) : (
                    <div className="py-10 text-center">
                        <h3 className="text-lg font-semibold">No se encontraron productos</h3>
                        <p className="text-muted-foreground">Intenta con otros filtros o términos de búsqueda</p>
                    </div>
                )}

                {/* Pagination indicator */}
                {products.last_page > 1 && (
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-2">
                            <Link href={products.first_page_url || '#'} preserveScroll preserveState>
                                <Button variant={'outline'}>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={products.prev_page_url || '#'} preserveScroll preserveState>
                                <Button variant={'outline'}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <span className="text-muted-foreground text-sm">
                            Página {products.current_page} de {products.last_page}
                        </span>

                        <div className="flex items-center space-x-2">
                            <Link href={products.next_page_url || '#'} preserveScroll preserveState>
                                <Button variant={'outline'}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={products.last_page_url || '#'} preserveScroll preserveState>
                                <Button variant={'outline'}>
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
};

export default ProductIndex;
