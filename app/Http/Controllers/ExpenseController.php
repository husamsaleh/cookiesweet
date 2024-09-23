<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::all();
        return Inertia::render('Expenses/Index', ['expenses' => $expenses]);
    }

    public function create()
    {
        return Inertia::render('Expenses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0', // Renamed from 'amount' to 'price'
            'purchase_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
        ]);

        Expense::create($validated);

        return redirect()->route('expenses.index')->with('success', 'Expense added successfully.');
    }

    public function edit($id)
    {
        $expense = Expense::findOrFail($id);
        return Inertia::render('Expenses/Edit', ['expense' => $expense]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0', // Renamed from 'amount' to 'price'
            'purchase_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
        ]);

        $expense = Expense::findOrFail($id);
        $expense->update($validated);

        return redirect()->route('expenses.index')->with('success', 'Expense updated successfully.');
    }

    public function destroy($id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();

        return redirect()->route('expenses.index')->with('success', 'Expense deleted successfully.');
    }
}