<?php

namespace App\Console\Commands\Internal;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SeedPermissionsCommand extends Command {
    protected $signature = 'internal:seed-permissions';

    protected $description = 'Rellena las tablas de permisos y roles con los valores por defecto.';

    public function handle(): void {
        $permissions = config('permission.default_values.permissions', []);
        $roles = config('permission.default_values.roles', []);

        $this->info('Seeding permissions...');
        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
            $this->info("Permission {$permission} seeded.");
        }

        $this->info('Seeding roles...');
        foreach ($roles as $name => $permissions) {
            Role::findOrCreate($name)->givePermissionTo($permissions);
        }

        $this->info('Roles and permissions seeded successfully.');
    }
}
