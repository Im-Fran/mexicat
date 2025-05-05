<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory {
    protected $model = Product::class;

    public function definition(): array {
        return [
            'name' => fake()->name(),
            'sku' => fake()->bothify('???#-???#-???#'),
            'barcode' => fake()->numerify('############'),
            'image' => fake()->imageUrl(),
            'description' => fake()->text(),
            'stock' => fake()->numberBetween(0, 100),
            'min_stock' => 10,
            'price' => fake()->randomFloat(2, 1000, 50000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
