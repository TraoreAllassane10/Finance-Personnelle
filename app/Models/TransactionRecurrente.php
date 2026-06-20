<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionRecurrente extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionRecurrenteFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
        'montant',
        'category_id',
        "date_echeance",
        'description',
        'frequence',
        'active',
        'user_id'
    ];

    protected $with = ['category'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
