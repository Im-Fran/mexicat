<?php

use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Requests\AuthKitAuthenticationRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLoginRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLogoutRequest;

Route::get('login', fn (AuthKitLoginRequest $request) => $request->redirect())->middleware(['guest'])->name('login');
Route::get('authenticate', fn (AuthKitAuthenticationRequest $request) => tap(to_route('home'), fn () => $request->authenticate()))->middleware(['guest']);
Route::post('logout', fn (AuthKitLogoutRequest $request) => $request->logout())->middleware(['auth'])->name('logout');
