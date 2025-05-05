<?php

namespace App\Console\Commands\Internal;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class AssignRoleCommand extends Command {
    protected $signature = 'internal:assign-role';

    protected $description = 'Asigna un rol a un usuario.';

    public function handle(): void {
        $usuarios = User::pluck('email');
        $roles = Role::all()->pluck('name');
        $user = $this->choice('Selecciona un usuario', $usuarios->toArray(), $usuarios->first());
        $role = $this->choice('Selecciona un rol', $roles->toArray(), $roles->first());
        $user = User::whereEmail($user)->first()->assignRole($role);
        $this->info("Rol {$role} asignado a {$user->name} ({$user->email})");
    }
}
