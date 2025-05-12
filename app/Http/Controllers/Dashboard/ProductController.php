<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CreateProductRequest;
use App\Http\Requests\Dashboard\UpdateProductRequest;
use App\Models\Product;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;
use Spatie\QueryBuilder\QueryBuilder;

class ProductController extends Controller {
    public function index() {
        $products = QueryBuilder::for(Product::class)
            ->defaultSort('stock')
            ->allowedFilters(['name', 'sku', 'barcode', 'price'])
            ->allowedSorts(['updated_at', 'created_at', 'price', 'stock', 'sku'])
            ->paginate();

        return inertia('dashboard/products/index', [
            'products' => $products,
        ]);
    }

    public function create() {
        return inertia('dashboard/products/create');
    }

    /**
     * @throws FileIsTooBig
     * @throws FileDoesNotExist
     */
    public function store(CreateProductRequest $request) {
        $product = Product::create($request->except('images'));
        if($request->has('images')) $product->addMediaFromRequest('images')
            ->toMediaCollection();

        return redirect()->route('dashboard.products.edit', ['product' => $product->id])->with('success', 'Producto creado correctamente.');
    }

    public function edit(Product $product) {
        return inertia('dashboard/products/edit', [
            'product' => $product,
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product) {
        $data = $request->all();

        $product->update($data);

        return back()->with('success', 'Producto actualizado correctamente.');
    }

    public function destroy(Product $product) {
        $product->delete();

        return back()->with('success', 'Producto eliminado correctamente.');
    }
}
