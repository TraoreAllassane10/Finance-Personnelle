<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Versement extends Model
{
    /** @use HasFactory<\Database\Factories\VersementFactory> */
    use HasFactory;

    protected $guarded = [];

    // protected $with = ["compte"];

    public function compte() {
        return $this->belongsTo(CompteEpargne::class);
    }
}
