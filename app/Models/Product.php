<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class Product extends Model implements HasMedia {
    use HasFactory,
        InteractsWithMedia,
        HasTags,
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

    public function registerMediaConversions(?Media $media = null): void {
        $this->addMediaConversion('thumb')
            ->fit(Fit::Contain, 300, 300)
            ->queued();
    }
}
