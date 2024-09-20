<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SweetController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::middleware(['admin'])->group(function () {
        Route::resource('orders', OrderController::class);
        Route::resource('sweets', SweetController::class);
        Route::resource('customers', CustomerController::class);

        // Reporting Routes
        Route::get('/reports/sales', [ReportController::class, 'sales'])->name('reports.sales');
        Route::get('/reports/inventory', [ReportController::class, 'inventory'])->name('reports.inventory');
        Route::get('/reports/customer-purchases', [ReportController::class, 'customerPurchases'])->name('reports.customerPurchases');

        // Bulk Order Management Route
        Route::post('/orders/bulk-update-status', [OrderController::class, 'bulkUpdateStatus'])->name('orders.bulkUpdateStatus');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Update these routes
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::get('/orders/create-existing', [OrderController::class, 'createExisting'])->name('orders.createExisting');
    Route::get('/orders/create-new', [OrderController::class, 'createNew'])->name('orders.createNew');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
});

require __DIR__.'/auth.php';
