<?php

namespace App\Services;

use App\Repositories\CompteEpargneRepository;
use Illuminate\Support\Facades\Auth;

class CompteEpargneServices
{
    public function __construct(
        protected CompteEpargneRepository $compteEpargneRepository
    ) {}

    public function getCompteEpargnes()
    {
        return $this->compteEpargneRepository->all();
    }

    public function createCompteEpargne(array $data)
    {
        $data["user_id"] = Auth::user()->id;
        return $this->compteEpargneRepository->create($data);
    }
}
