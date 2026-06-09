<?php

namespace App\Services;

use App\Repositories\VersementRepository;
use Illuminate\Support\Facades\Auth;

class VersementService
{
    public function __construct(
        protected VersementRepository $versementRepository
    ) {}

    public function getVersements()
    {
        return $this->versementRepository->all();
    }

    public function createVersement(array $data)
    {
        $data['user_id'] = Auth::user()->id;
        return $this->versementRepository->create($data);
    }

    // Montant total des versements
    public function getMontantTotalVersement()
    {
        return $this->versementRepository->totalVersement();
    }

    // Montant total des versement par periode
    public function getMontantTotalVersementParPeriode(string $periode)
    {
        return $this->versementRepository->totalVersementParPeriode($periode);
    }
}
