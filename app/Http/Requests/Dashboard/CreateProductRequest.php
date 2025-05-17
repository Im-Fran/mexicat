<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest {
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['nullable', 'string', 'max:100', 'unique:products'],
            'barcode' => ['nullable', 'string', 'max:100', 'unique:products'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'images.*' => ['image', 'max:6144'], // 6MB
        ];
    }

    public function authorize(): bool {
        return auth()->check() && auth()->user()->can('dashboard.products.create');
    }

    public function messages(): array {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'sku.unique' => 'El SKU ya está en uso.',
            'barcode.unique' => 'El código de barras ya está en uso.',
            'price.required' => 'El precio es obligatorio.',
            'stock.required' => 'El stock es obligatorio.',
            'images.*.image' => 'El archivo debe ser una imagen.',
            'images.*.max' => 'La imagen no debe pesar más de 6MB.',
        ];
    }
}
