<?php

namespace App\Http\Controllers\Account;

use App\Helpers\Helpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\Addresses\CreateAddressRequest;
use App\Http\Requests\Account\Addresses\UpdateAddressRequest;
use App\Models\Address;
use App\Models\Country;

class AddressController extends Controller {
    public function index() {
        return inertia('account/addresses', [
            'addresses' => Address::whereOwnedBy(auth()->user())->get(),
            'regions' => Helpers::regiones(),
            'countries' => Country::all(),
        ]);
    }

    public function store(CreateAddressRequest $request) {
        Address::create($request->all());

        return back();
    }

    public function update(UpdateAddressRequest $request, Address $address) {
        $address->update($request->all());

        return back();
    }

    public function destroy(Address $address) {
        $address->delete();

        return back();
    }
}
