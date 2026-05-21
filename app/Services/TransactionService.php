<?php

namespace App\Services;

use App\Models\Transaction;
use App\Repositories\TransactionRepository;
use Illuminate\Support\Facades\Auth;

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

    public function getMontantTotalDepense()
    {
        return (int) $this->transactionRepository->montantTotalDepense();
    }

    public function getMontantTotalRevenu()
    {
        return (int) $this->transactionRepository->montantTotalRevenu();
    }

    public function getTransaction(string $id)
    {
        return $this->transactionRepository->find($id);
    }

    public function createTransaction(array $data)
    {
        $data['user_id'] = Auth::user()->id;

        return $this->transactionRepository->create($data);
    }

    public function updateTransaction(Transaction $transaction, array $data)
    {
        return $this->transactionRepository->update($transaction, $data);
    }

    public function deleteTransaction(Transaction $transaction)
    {
        return $this->transactionRepository->delete($transaction);
    }
}
