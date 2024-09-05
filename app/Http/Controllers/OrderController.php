<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Sweet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('customer')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }

    public function create()
    {
        $customers = Customer::all();
        $sweets = Sweet::all();
        return Inertia::render('Orders/Create', ['customers' => $customers, 'sweets' => $sweets]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sweets' => 'required|array',
            'sweets.*.id' => 'required|exists:sweets,id',
            'sweets.*.quantity' => 'required|integer|min:1',
            'special_requests' => 'nullable|string',
        ]);

        $order = Order::create([
            'customer_id' => $validated['customer_id'],
            'status' => 'received',
            'special_requests' => $validated['special_requests'],
            'total_amount' => 0, // We'll calculate this next
        ]);

        $totalAmount = 0;
        foreach ($validated['sweets'] as $sweetData) {
            $sweet = Sweet::find($sweetData['id']);
            $order->sweets()->attach($sweet->id, ['quantity' => $sweetData['quantity']]);
            $totalAmount += $sweet->price * $sweetData['quantity'];

            // Update stock
            $sweet->decrement('stock', $sweetData['quantity']);
        }

        $order->update(['total_amount' => $totalAmount]);

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    public function show(Order $order)
    {
        $order->load('customer', 'sweets');
        return Inertia::render('Orders/Show', ['order' => $order]);
    }

    public function updateStatus(Order $order, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:received,in_progress,completed,shipped',
        ]);

        $order->update(['status' => $validated['status']]);

        return back()->with('success', 'Order status updated successfully.');
    }
}