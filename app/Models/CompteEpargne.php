<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompteEpargne extends Model
{
    /** @use HasFactory<\Database\Factories\CompteEpargneFactory> */
    use HasFactory;

    protected $fillable = ['nom', 'user_id'];

    public function versements()
    {
        return $this->hasMany(Versement::class);
    }
}
