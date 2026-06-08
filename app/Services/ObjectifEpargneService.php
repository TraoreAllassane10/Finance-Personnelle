<?php

namespace App\Services;

use App\Repositories\ObjectifEpargneRepository;
use Illuminate\Support\Facades\Auth;

class ObjectifEpargneService
{

    public function __construct(
        protected ObjectifEpargneRepository $objectifEpargneRepository
    ) {}

    public function getObjectifEpargnes()
    {
        return $this->objectifEpargneRepository->all();
    }

    public function createObjectifEpargne(array $data)
    {
        $data['user_id'] = Auth::user()->id;
        return $this->objectifEpargneRepository->create($data);
    }
}
