<?php

namespace App\Repositories;

use App\Models\Versement;

class VersementRepository
{

    public function all()
    {
        return Versement::all();
    }

    public function create(array $data)
    {
        return Versement::create($data);
    }
}
