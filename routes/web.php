<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SweetController;
use App\Http\Controllers\CustomerController;

// Add this at the top of your routes
Route::get('/phpinfo', function () {
    return phpinfo();
});

Route::get('/test', function () {
    return Inertia::render('Test', ['message' => 'Hello from Inertia!']);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/sweets', [SweetController::class, 'index'])->name('sweets.index');
    Route::get('/sweets/create', [SweetController::class, 'create'])->name('sweets.create');
    Route::post('/sweets', [SweetController::class, 'store'])->name('sweets.store');
    Route::get('/sweets/{sweet}/edit', [SweetController::class, 'edit'])->name('sweets.edit');
    Route::put('/sweets/{sweet}', [SweetController::class, 'update'])->name('sweets.update');
    Route::delete('/sweets/{sweet}', [SweetController::class, 'destroy'])->name('sweets.destroy');
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('/customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('/customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::get('/customers/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
    Route::put('/customers/{customer}', [CustomerController::class, 'update'])->name('customers.update');
    Route::get('/customers/{customer}', [CustomerController::class, 'show'])->name('customers.show');
    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::get('/orders/create-existing', [OrderController::class, 'createExisting'])->name('orders.createExisting');
    Route::get('/orders/create-new', [OrderController::class, 'createNew'])->name('orders.createNew');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
});

require __DIR__.'/auth.php';
