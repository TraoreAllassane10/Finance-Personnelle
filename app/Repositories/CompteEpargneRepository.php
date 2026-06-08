<?php

namespace App\Repositories;

use App\Models\CompteEpargne;

class CompteEpargneRepository
{
    public function all()
    {
        return CompteEpargne::withSum("versements as montant_total_compte", "montant_verse")->get();
    }

    public function create(array $data)
    {
        return CompteEpargne::create($data);
    }
}
