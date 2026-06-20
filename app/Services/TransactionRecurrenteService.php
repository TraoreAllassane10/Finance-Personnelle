<?php

namespace App\Services;

use App\Models\TransactionRecurrente;
use App\Repositories\TransactionRecurrenteRepository;
use Illuminate\Support\Facades\Auth;

class TransactionRecurrenteService
{

    public function __construct(
        protected TransactionRecurrenteRepository $transactionRecurrenteRepository
    ) {}

     public function getTransactions()
    {
        return $this->transactionRecurrenteRepository->all();
    }

    public function createTransaction(array $data)
    {
        $data['user_id'] = Auth::user()->id;

        return $this->transactionRecurrenteRepository->create($data);
    }

    // Modifie une transaction
    public function updateTransaction(TransactionRecurrente $transaction, array $data)
    {
        return $this->transactionRecurrenteRepository->update($transaction, $data);
    }

    // Supprime une transaction
    public function deleteTransaction(TransactionRecurrente $transaction)
    {
        return $this->transactionRecurrenteRepository->delete($transaction);
    }
}
