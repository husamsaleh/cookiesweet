<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Sweet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Response as InertiaResponse; // Alias to avoid conflict

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('customer')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }

    /**
     * Show the form for creating a new order with an existing customer.
     *
     * @return \Inertia\Response
     */
    public function createExisting(): InertiaResponse
    {
        $customers = Customer::all();
        $sweets = Sweet::all();
        return Inertia::render('Orders/CreateExisting', [
            'customers' => $customers,
            'sweets' => $sweets,
        ]);
    }

    /**
     * Show the form for creating a new order with a new customer.
     *
     * @return \Inertia\Response
     */
    public function createNew(): InertiaResponse
    {
        $sweets = Sweet::all();
        return Inertia::render('Orders/CreateNew', [
            'sweets' => $sweets,
        ]);
    }

    public function create()
    {
        return Inertia::render('Orders/Create');
    }

    public function store(Request $request)
    {
        Log::info('Received order data: ' . json_encode($request->all()));

        $validated = $request->validate([
            'customer_id' => 'required_without:new_customer',
            'new_customer' => 'required_without:customer_id|array',
            'new_customer.name' => 'required_with:new_customer|string|max:255',
            'new_customer.email' => 'required_with:new_customer|email|unique:customers,email',
            'sweets' => 'required|array',
            'sweets.*.id' => 'required|exists:sweets,id',
            'sweets.*.quantity' => 'required|integer|min:1',
            'special_requests' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            // Handle new customer creation if provided
            if ($request->has('new_customer')) {
                $customer = Customer::create([
                    'name' => $validated['new_customer']['name'],
                    'email' => $validated['new_customer']['email'],
                ]);
                $customerId = $customer->id;
            } else {
                $customerId = $validated['customer_id'];
            }

            $totalAmount = 0;
            foreach ($validated['sweets'] as $sweet) {
                $sweetModel = Sweet::findOrFail($sweet['id']);
                $totalAmount += $sweetModel->price * $sweet['quantity'];

                // Check and update stock
                if ($sweetModel->stock < $sweet['quantity']) {
                    throw new \Exception("Not enough stock for {$sweetModel->name}");
                }
                $sweetModel->stock -= $sweet['quantity'];
                $sweetModel->save();
            }

            $order = Order::create([
                'customer_id' => $customerId,
                'special_requests' => $validated['special_requests'] ?? null,
                'total_amount' => $totalAmount,
                'status' => 'pending',
            ]);

            foreach ($validated['sweets'] as $sweet) {
                $order->sweets()->attach($sweet['id'], ['quantity' => $sweet['quantity']]);
            }

            DB::commit();
            return redirect()->route('orders.index')->with('success', 'Order created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating order: ' . $e->getMessage());
            return back()->withErrors(['error' => $e->getMessage()]);
        }
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

    public function bulkUpdateStatus(Request $request)
    {
        $validated = $request->validate([
            'order_ids' => 'required|array',
            'order_ids.*' => 'exists:orders,id',
            'status' => 'required|in:received,in_progress,completed,shipped',
        ]);

        Order::whereIn('id', $validated['order_ids'])->update(['status' => $validated['status']]);

        \Log::info('Bulk updated orders: ' . implode(',', $validated['order_ids']) . ' to status: ' . $validated['status']);

        return redirect()->route('orders.index')->with('success', 'Selected orders updated successfully.');
    }
}