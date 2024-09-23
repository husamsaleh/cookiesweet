<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_name',
        'description',
        'price', // Renamed from 'amount' to 'price'
        'purchase_date',
        'quantity',
    ];
}