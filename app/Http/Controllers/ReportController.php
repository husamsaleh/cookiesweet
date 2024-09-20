<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Sweet;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse; // Alias to avoid conflict

class ReportController extends Controller
{
    /**
     * Generate sales report data.
     *
     * @return \Inertia\Response
     */
    public function sales(): InertiaResponse
    {
        $salesData = Order::selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
                          ->groupBy('date')
                          ->orderBy('date', 'asc')
                          ->get();

        return Inertia::render('Reports/Sales', [
            'salesData' => $salesData,
        ]);
    }

    /**
     * Generate inventory report data.
     *
     * @return \Inertia\Response
     */
    public function inventory(): InertiaResponse
    {
        $inventoryData = Sweet::select('name', 'stock')
                              ->orderBy('stock', 'asc')
                              ->get();

        return Inertia::render('Reports/Inventory', [
            'inventoryData' => $inventoryData,
        ]);
    }

    /**
     * Generate customer purchase history report.
     *
     * @return \Inertia\Response
     */
    public function customerPurchases(): InertiaResponse
    {
        $customerPurchases = Customer::with(['orders' => function($query) {
                                    $query->with('sweets');
                                }])->get();

        return Inertia::render('Reports/CustomerPurchases', [
            'customerPurchases' => $customerPurchases,
        ]);
    }
}