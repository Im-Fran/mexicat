<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Spatie\QueryBuilder\QueryBuilder;

class PermissionsController extends Controller {
    public function index() {
        $permissions = QueryBuilder::for(Permission::class)
            ->allowedFilters(['name'])
            ->allowedSorts(['name', 'created_at', 'updated_at'])
            ->defaultSort('-created_at')
            ->paginate(10);

        return inertia('dashboard/permissions/index', [
            'permissions' => $permissions,
        ]);
    }

    public function store() {
        $permission = Permission::create([
            'name' => request('name'),
        ]);

        return redirect()->back()->with('success', 'Permiso creado correctamente.');
    }

    public function update(Permission $permission) {
        $permission->update([
            'name' => request('name'),
        ]);

        return redirect()->back()->with('success', 'Permiso actualizado correctamente.');
    }

    public function destroy(Permission $permission) {
        $permission->delete();

        return redirect()->back()->with('success', 'Permiso eliminado correctamente.');
    }
}
