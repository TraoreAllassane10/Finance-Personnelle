<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revenus extends Model
{
    protected $fillable = [
        'date',
        'monatant',
        'category_id',
        'description'
    ];

    protected $with = ["category"];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
