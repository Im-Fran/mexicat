<?php

namespace App\Models;

use Cog\Contracts\Ownership\CanBeOwner;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements CanBeOwner {
    use HasFactory,
        HasRoles,
        Notifiable;

    protected $fillable = [
        'name',
        'email',
        'workos_id',
        'avatar',
    ];

    protected $hidden = [
        'workos_id',
        'remember_token',
    ];

    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
