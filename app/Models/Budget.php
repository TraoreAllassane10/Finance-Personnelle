<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    /** @use HasFactory<\Database\Factories\BudgetFactory> */
    use HasFactory;

    protected $fillable = [
        'montant_alloue',
        'user_id',
        'category_id',
        "mois",
        'annee'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }
}
