<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory {
    public function definition(): array {
        return [
            'name' => fake()->name(),
            'sku' => fake()->bothify('???#-???#-???#'),
            'barcode' => fake()->numerify('############'),
            'description' => fake()->text(),
            'stock' => fake()->numberBetween(0, 100),
            'min_stock' => 10,
            'price' => fake()->randomFloat(2, 1000, 50000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function configure(): ProductFactory {
        return $this->afterCreating(function(Product $product) {
            $product->addMediaFromUrl('https://picsum.photos/1200/800')
                ->preservingOriginal()
                ->toMediaCollection('products');

            $product->attachTags(fake()->words());
        });
    }
}
