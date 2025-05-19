<?php

use App\Http\Controllers\Account;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductsController;
use App\Http\Middleware\Owns;
use Illuminate\Auth\Middleware\Authorize;
use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', HomeController::class)->name('home');

Route::prefix('account')->middleware(['auth', ValidateSessionWithWorkOS::class])->group(function() {
    Route::get('/', [AccountController::class, 'index'])->name('account.index');
    Route::patch('/', [AccountController::class, 'update'])->name('account.update');

    Route::get('/security', [AccountController::class, 'security'])->name('account.security');

    Route::prefix('addresses')->group(function() {
        Route::get('/', [Account\AddressController::class, 'index'])->name('account.addresses');
        Route::post('/', [Account\AddressController::class, 'store'])->name('account.addresses.store');
        Route::patch('/{address}', [Account\AddressController::class, 'update'])->middleware([Owns::model('address')])->name('account.addresses.update');
        Route::delete('/{address}', [Account\AddressController::class, 'destroy'])->middleware([Owns::model('address')])->name('account.addresses.destroy');
    });

    Route::get('/orders', [AccountController::class, 'orders'])->name('account.orders');
});

Route::prefix('products')->group(function() {
    Route::get('/', [ProductsController::class, 'index'])->name('products.index');
});

Route::prefix('cart')->group(function() {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::get('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

    Route::post('/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('/update', [CartController::class, 'update'])->name('cart.update');
    Route::post('/remove', [CartController::class, 'remove'])->name('cart.remove');
});

Route::middleware(['auth', ValidateSessionWithWorkOS::class, Authorize::using('dashboard.overview')])->prefix('dashboard')->group(function() {
    Route::get('/', Dashboard\OverviewController::class)->name('dashboard.overview');

    Route::middleware([Authorize::using('dashboard.products')])->prefix('products')->group(function() {
        Route::get('/', [Dashboard\ProductController::class, 'index'])->name('dashboard.products.index');
        Route::get('/create', [Dashboard\ProductController::class, 'create'])->name('dashboard.products.create');
        Route::post('/create', [Dashboard\ProductController::class, 'store'])->name('dashboard.products.store');

        Route::get('/edit/{product}', [Dashboard\ProductController::class, 'edit'])->name('dashboard.products.edit');
        Route::patch('/edit/{product}', [Dashboard\ProductController::class, 'update'])->name('dashboard.products.update');

        Route::delete('/delete/{product}', [Dashboard\ProductController::class, 'destroy'])->name('dashboard.products.delete');
    });

    Route::middleware([Authorize::using('dashboard.customers')])->prefix('customers')->group(function() {
        Route::get('/', [Dashboard\CustomerController::class, 'index'])->name('dashboard.customers.index');

        Route::get('/edit/{customer}', [Dashboard\CustomerController::class, 'edit'])->middleware([Authorize::using('dashboard.customers.edit.*')])->name('dashboard.customers.edit');
        Route::patch('/edit/{customer}', [Dashboard\CustomerController::class, 'update'])->middleware([Authorize::using('dashboard.customers.update.*')])->name('dashboard.customers.update');

        Route::delete('/delete/{customer}', [Dashboard\CustomerController::class, 'destroy'])->middleware([Authorize::using('dashboard.customers.delete.*')])->name('dashboard.customers.delete');
    });

    Route::middleware([Authorize::using('dashboard.roles')])->prefix('roles')->group(function() {
        Route::get('/', [Dashboard\RoleController::class, 'index'])->name('dashboard.roles.index');
        Route::get('/create', [Dashboard\RoleController::class, 'create'])->name('dashboard.roles.create');
        Route::post('/create', [Dashboard\RoleController::class, 'store'])->name('dashboard.roles.store');

        Route::get('/edit/{role}', [Dashboard\RoleController::class, 'edit'])->name('dashboard.roles.edit');
        Route::patch('/edit/{role}', [Dashboard\RoleController::class, 'update'])->name('dashboard.roles.update');

        Route::delete('/delete/{role}', [Dashboard\RoleController::class, 'destroy'])->name('dashboard.roles.delete');
    });

    Route::middleware([Authorize::using('dashboard.permissions')])->prefix('permissions')->group(function() {
        Route::get('/', [Dashboard\PermissionsController::class, 'index'])->name('dashboard.permissions.index');
        Route::post('/create', [Dashboard\PermissionsController::class, 'store'])->name('dashboard.permissions.store');
        Route::patch('/edit/{permission}', [Dashboard\PermissionsController::class, 'update'])->name('dashboard.permissions.update');
        Route::delete('/delete/{permission}', [Dashboard\PermissionsController::class, 'destroy'])->name('dashboard.permissions.delete');
    });
});

require __DIR__.'/auth.php';
