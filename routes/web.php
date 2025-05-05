<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\HomeController;
use Illuminate\Auth\Middleware\Authorize;
use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth', ValidateSessionWithWorkOS::class])->group(function() {});

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
});

require __DIR__.'/auth.php';
