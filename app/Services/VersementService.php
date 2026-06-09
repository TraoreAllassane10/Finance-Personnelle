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
}
