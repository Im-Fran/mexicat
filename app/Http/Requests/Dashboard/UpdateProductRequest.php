<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest {
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['nullable', 'string', 'max:100', Rule::unique('products')->ignore($this->product)],
            'barcode' => ['nullable', 'string', 'max:100', Rule::unique('products')->ignore($this->product)],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ];
    }

    public function authorize(): bool {
        return auth()->check() && auth()->user()->can('dashboard.products.edit');
    }
}
