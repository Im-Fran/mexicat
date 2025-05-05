<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class OverviewController extends Controller {
    public function __invoke() {
        return inertia('dashboard/overview', [
            'users' => User::count('id'),
            'products' => Product::count('id'),
            'permissions' => Permission::query()->count('id'),
            'roles' => Role::query()->count('id'),
        ]);
    }
}
