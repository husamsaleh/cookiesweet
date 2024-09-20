<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('customer')->latest()->get();
        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    // Other methods...
}