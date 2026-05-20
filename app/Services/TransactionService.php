<?php

namespace App\Services;

use App\Repositories\TransactionRepository;

class TransactionService
{
    public function __construct(
        protected TransactionRepository $transactionRepository
    ) {}

    public function revenus()
    {
        return $this->transactionRepository->allRevenu();
    }

    public function depenses()
    {
        return $this->transactionRepository->allDepense();
    }

    public function createTransaction(array $data)
    {
        return $this->transactionRepository->create($data);
    }
}
