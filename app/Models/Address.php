<?php

namespace App\Models;

use Cog\Contracts\Ownership\Ownable;
use Cog\Laravel\Ownership\Traits\HasOwner;
use Illuminate\Database\Eloquent\Model;

class Address extends Model implements Ownable {
    use HasOwner;

    protected string $ownerModel = User::class;

    protected string $ownerPrimaryKey = 'id';

    protected string $ownerForeignKey = 'user_id';

    protected bool $withDefaultOwnerOnCreate = true;

    protected $fillable = [
        'user_id',
        'name',
        'street',
        'city',
        'region',
        'country',
        'postal_code',
        'is_default',
    ];
}
