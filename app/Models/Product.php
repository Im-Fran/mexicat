<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model {
    use HasFactory,
        SoftDeletes;

    protected $fillable = [
        'parent_id',
        'name',
        'sku',
        'barcode',
        'image',
        'description',
        'stock',
        'min_stock',
        'price',
    ];

    public function parent(): BelongsTo {
        return $this->belongsTo(Product::class, 'parent_id');
    }
}
