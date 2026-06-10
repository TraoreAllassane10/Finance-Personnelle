<?php

namespace App\Repositories;

use App\Models\CompteEpargne;
use Illuminate\Support\Facades\Auth;

class CompteEpargneRepository
{
    public function all()
    {
        return CompteEpargne::withSum("versements as montant_total_compte", "montant_verse")
            ->where('user_id', Auth::user()->id)
            ->get();
    }

    public function create(array $data)
    {
        return CompteEpargne::create($data);
    }
}
