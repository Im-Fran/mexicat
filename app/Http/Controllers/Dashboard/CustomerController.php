<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Customer\UpdateCustomerRequest;
use App\Models\User;
use Spatie\QueryBuilder\QueryBuilder;

class CustomerController extends Controller {
    public function index() {
        $users = QueryBuilder::for(User::class)
            ->allowedFilters(['name', 'email'])
            ->allowedSorts(['name', 'email', 'updated_at', 'created_at'])
            ->defaultSort('-updated_at')
            ->paginate(10);

        return inertia('dashboard/customers/index', [
            'users' => $users,
        ]);
    }

    public function edit(User $customer) {
        return inertia('dashboard/customers/edit', [
            'customer' => $customer,
        ]);
    }

    public function update(UpdateCustomerRequest $request, User $customer) {
        $customer->update($request->all());
        return redirect()->route('dashboard.customers.index')->with('success', 'Cliente actualizado correctamente.');
    }

    public function destroy(User $customer) {
        $customer->delete();

        return redirect()->route('dashboard.customers.index')->with('success', 'Cliente eliminado correctamente.');
    }
}
