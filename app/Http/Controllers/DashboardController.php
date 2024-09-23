<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Sweet;
use App\Models\Customer;

class DashboardController extends Controller
{
    public function index()
    {
        $totalSales = Order::sum('total_amount');
        $pendingOrders = Order::where('status', 'pending')->count();
        $workingOnOrders = Order::where('status', 'working_on')->count();
        $readyForDeliveryOrders = Order::where('status', 'ready_for_delivery')->count();
        $deliveredOrders = Order::where('status', 'delivered')->count();
        $waitingForCashOrders = Order::where('status', 'waiting_for_cash')->count();
        $lowStockSweets = Sweet::where('stock', '<', 10)->get();
        $totalCustomers = Customer::count();

        return Inertia::render('Dashboard', [
            'totalSales' => $totalSales,
            'pendingOrders' => $pendingOrders,
            'workingOnOrders' => $workingOnOrders,
            'readyForDeliveryOrders' => $readyForDeliveryOrders,
            'deliveredOrders' => $deliveredOrders,
            'waitingForCashOrders' => $waitingForCashOrders,
            'lowStockSweets' => $lowStockSweets,
            'totalCustomers' => $totalCustomers,
        ]);
    }
}