<?php

namespace App\Http\Controllers;

use App\Models\Sweet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SweetController extends Controller
{
    public function index()
    {
        $sweets = Sweet::paginate(10);
        return Inertia::render('Sweets/Index', ['sweets' => $sweets]);
    }

    public function create()
    {
        return Inertia::render('Sweets/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        Sweet::create($validated);

        return redirect()->route('sweets.index')->with('success', 'Sweet created successfully.');
    }

    public function edit(Sweet $sweet)
    {
        return Inertia::render('Sweets/Edit', ['sweet' => $sweet]);
    }

    public function update(Request $request, Sweet $sweet)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $sweet->update($validated);

        return redirect()->route('sweets.index')->with('success', 'Sweet updated successfully.');
    }

    public function destroy(Sweet $sweet)
    {
        $sweet->delete();

        return redirect()->route('sweets.index')->with('success', 'Sweet deleted successfully.');
    }
}