<?php

namespace App\Services;

use App\Repositories\CompteEpargneRepository;

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
        return $this->compteEpargneRepository->create($data);
    }
}
