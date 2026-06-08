<?php

namespace App\Repositories;

use App\Models\ObjectifEpargne;
use Illuminate\Support\Facades\Auth;

class ObjectifEpargneRepository
{
    public function all()
    {
        return ObjectifEpargne::withSum("versements as montant_total_epargne", "montant_verse")
            ->where("user_id", Auth::user()->id)
            ->get();
    }

    public function create(array $data)
    {
        return ObjectifEpargne::create($data);
    }
}
