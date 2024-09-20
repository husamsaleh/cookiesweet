<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Order;
use App\Models\Sweet;
use App\Models\Customer;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalSales = Order::sum('total_amount');
        $pendingOrders = Order::where('status', 'pending')->count();
        $lowStockSweets = Sweet::where('stock', '<', 10)->get();
        $totalCustomers = Customer::count();

        return Inertia::render('Dashboard', [
            'totalSales' => $totalSales,
            'pendingOrders' => $pendingOrders,
            'lowStockSweets' => $lowStockSweets,
            'totalCustomers' => $totalCustomers,
        ]);
    }
}