<?php

namespace App\Http\Controllers;

use App\Http\Requests\Account\UpdateAccountRequest;

class AccountController extends Controller {
    public function index() {
        return inertia('account/profile', [
            'user' => auth()->user(),
        ]);
    }

    public function update(UpdateAccountRequest $request) {
        $request->user()->update($request->all());

        return back();
    }

    public function security() {}

    public function orders() {}
}
