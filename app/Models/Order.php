<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'total_amount',
        'status',
        'special_requests',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function sweets()
    {
        return $this->belongsToMany(Sweet::class)->withPivot('quantity');
    }
}