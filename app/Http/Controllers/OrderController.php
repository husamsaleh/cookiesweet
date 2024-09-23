<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Customer;
use App\Models\Sweet;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        \Log::info('Received filters:', ['date' => $request->filter, 'status' => $request->statusFilter]);
        
        $query = Order::with('customer')->latest();

        // Apply date filter
        switch ($request->filter) {
            case 'today':
                $query->whereDate('created_at', today());
                break;
            case 'this_week':
                $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                break;
            case 'this_month':
                $query->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year);
                break;
        }

        // Apply status filter
        if ($request->statusFilter && $request->statusFilter !== 'all') {
            $query->where('status', $request->statusFilter);
        }

        $orders = $query->get();

        \Log::info('Filtered orders count:', ['count' => $orders->count()]);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'filter' => $request->filter ?? 'all',
            'statusFilter' => $request->statusFilter ?? 'all'
        ]);
    }

    public function create()
    {
        return Inertia::render('Orders/Create');
    }

    public function createExisting()
    {
        $customers = Customer::all();
        $sweets = Sweet::all();
        return Inertia::render('Orders/CreateExisting', [
            'customers' => $customers,
            'sweets' => $sweets,
        ]);
    }

    public function createNew()
    {
        $sweets = Sweet::all();
        return Inertia::render('Orders/CreateNew', [
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
            'new_customer.phone' => 'nullable|string|max:20', // Add this line
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
            'status' => 'pending',
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        // Attach sweets to order
        foreach ($validated['sweets'] as $sweet) {
            $order->sweets()->attach($sweet['id'], ['quantity' => $sweet['quantity']]);
        }

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    public function edit($id)
    {
        $order = Order::with('customer', 'sweets')->findOrFail($id);
        return Inertia::render('Orders/Edit', [
            'order' => $order,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sweets' => 'required|array',
            'sweets.*.id' => 'required|exists:sweets,id',
            'sweets.*.quantity' => 'required|integer|min:1',
            'special_requests' => 'nullable|string',
            'status' => 'required|in:pending,working_on,ready_for_delivery,delivered', // Ensure status validation matches the allowed values
        ]);

        $order = Order::findOrFail($id);

        // Update order details
        $order->customer_id = $validated['customer_id'];
        $order->special_requests = $validated['special_requests'] ?? null;
        $order->status = $validated['status']; // Update status

        // Calculate total amount
        $totalAmount = 0;
        foreach ($validated['sweets'] as $sweet) {
            $sweetModel = Sweet::find($sweet['id']);
            $totalAmount += $sweetModel->price * $sweet['quantity'];
        }
        $order->total_amount = $totalAmount;

        $order->save();

        // Sync sweets with order
        $order->sweets()->sync([]);
        foreach ($validated['sweets'] as $sweet) {
            $order->sweets()->attach($sweet['id'], ['quantity' => $sweet['quantity']]);
        }

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }
}