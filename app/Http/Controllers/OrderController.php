<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Customer;
use App\Models\Sweet;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('customer')->latest()->get();
        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        $customers = Customer::all();
        $sweets = Sweet::all();
        return Inertia::render('Orders/Create', [
            'customers' => $customers,
            'sweets' => $sweets,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required_without:new_customer|exists:customers,id',
            'new_customer' => 'required_without:customer_id|array',
            'new_customer.name' => 'required_with:new_customer|string|max:255',
            'new_customer.email' => 'required_with:new_customer|email|unique:customers,email',
            'sweets' => 'required|array',
            'sweets.*.id' => 'required|exists:sweets,id',
            'sweets.*.quantity' => 'required|integer|min:1',
            'special_requests' => 'nullable|string',
        ]);

        // Create new customer if needed
        if (isset($validated['new_customer'])) {
            $customer = Customer::create($validated['new_customer']);
            $validated['customer_id'] = $customer->id;
        }

        // Calculate total amount
        $totalAmount = 0;
        foreach ($validated['sweets'] as $sweet) {
            $sweetModel = Sweet::find($sweet['id']);
            $totalAmount += $sweetModel->price * $sweet['quantity'];
        }

        // Create order
        $order = Order::create([
            'customer_id' => $validated['customer_id'],
            'total_amount' => $totalAmount,
            'status' => 'received',
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        // Attach sweets to order
        foreach ($validated['sweets'] as $sweet) {
            $order->sweets()->attach($sweet['id'], ['quantity' => $sweet['quantity']]);
        }

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }
}