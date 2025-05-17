<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Spatie\QueryBuilder\QueryBuilder;

class ProductsController extends Controller {
    public function index() {
        $products = QueryBuilder::for(Product::class)
            ->allowedFilters(['name', 'sku', 'barcode', 'price'])
            ->allowedSorts(['name', 'sku', 'barcode', 'price'])
            ->defaultSort('name')
            ->with(['media'])
            ->paginate(10)
            ->withQueryString();

        return inertia('products/index', [
            'products' => $products,
        ]);
    }
}
