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

    public function getTransactions() {
        return $this->transactionRepository->all();
    }

    // Recupere le montant total des depenses
    public function getMontantTotalDepense()
    {
        return (int) $this->transactionRepository->montantTotalDepense();
    }

    // Recupere le montant total des revenus
    public function getMontantTotalRevenu()
    {
        return (int) $this->transactionRepository->montantTotalRevenu();
    }

    // Recupere les dernieres transactions
    public function getRecenteTransaction()
    {
        return $this->transactionRepository->recenteTransaction();
    }

    // Recupere une transaction
    public function getTransaction(string $id)
    {
        return $this->transactionRepository->find($id);
    }

    // Crée une transaction
    public function createTransaction(array $data)
    {
        $data['user_id'] = Auth::user()->id;

        return $this->transactionRepository->create($data);
    }

    // Modifie une transaction
    public function updateTransaction(Transaction $transaction, array $data)
    {
        return $this->transactionRepository->update($transaction, $data);
    }

    // Supprime une transaction
    public function deleteTransaction(Transaction $transaction)
    {
        return $this->transactionRepository->delete($transaction);
    }
}
