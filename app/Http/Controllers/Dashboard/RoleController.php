<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\QueryBuilder\QueryBuilder;

class RoleController extends Controller {
    public function index() {
        $roles = QueryBuilder::for(Role::class)
            ->allowedIncludes(['permissions'])
            ->allowedFilters(['name'])
            ->allowedSorts(['name', 'created_at', 'updated_at'])
            ->defaultSort('-created_at')
            ->paginate(10)
            ->withQueryString();

        return inertia('dashboard/roles/index', [
            'roles' => $roles,
        ]);
    }

    public function create() {
        return inertia('dashboard/roles/create', [
            'permissions' => Permission::all(),
        ]);
    }

    public function store() {
        request()->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'sometimes|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role = Role::create([
            'name' => request('name'),
        ]);

        $role->syncPermissions(request('permissions', []));

        return redirect()->route('dashboard.roles.index')->with('success', 'Rol creado correctamente.');
    }

    public function edit(Role $role) {
        $role->load(['permissions']);

        return inertia('dashboard/roles/edit', [
            'role' => $role,
            'allPermissions' => Permission::all(),
        ]);
    }

    public function update(Role $role) {
        request()->validate([
            'name' => 'required|string|max:255|unique:roles,name,'.$role->id,
            'permissions' => 'sometimes|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role->update([
            'name' => request('name'),
        ]);

        $role->syncPermissions(request('permissions', []));

        return redirect()->route('dashboard.roles.index')->with('success', 'Rol actualizado correctamente.');
    }

    public function destroy(Role $role) {
        $role->delete();

        return redirect()->route('dashboard.roles.index')->with('success', 'Rol eliminado correctamente.');
    }
}
