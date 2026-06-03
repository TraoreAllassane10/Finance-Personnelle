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

    public function revenus(array|null $date, string|null $categorie)
    {
        $year = $date ? $date[0] : now()->year;
        $month = $date ? $date[1] : now()->month;
        return $this->transactionRepository->allRevenu($year, $month, $categorie);
    }

    public function depenses(array|null $date, string|null $categorie)
    {
        $year = $date ? $date[0] : now()->year;
        $month = $date ? $date[1] : now()->month;
        return $this->transactionRepository->allDepense($year, $month, $categorie);
    }

    public function getTransactions()
    {
        return $this->transactionRepository->all();
    }

    // Recupere les transactions par periode
    public function getTransactionParPeriode(string $periode)
    {
        return $this->transactionRepository->transactionParPeriode($periode);
    }

    // Recupere le montant total des depenses
    public function getMontantTotalDepense(string $periode)
    {
        return (int) $this->transactionRepository->montantTotalDepense($periode);
    }

    // Recupere le montant total des revenus
    public function getMontantTotalRevenu(string $periode)
    {
        return (int) $this->transactionRepository->montantTotalRevenu($periode);
    }

    // Recupere le montant total des revenus du mois dernier
    public function getMontantTotalRevenuMoisDernier()
    {
        return (int) $this->transactionRepository->montantTotalRevenuMoisDernier();
    }

     // Recupere le montant total des depenses du mois dernier
    public function getMontantTotalDepenseMoisDernier()
    {
        return (int) $this->transactionRepository->montantTotalDepenseMoisDernier();
    }

    // Recupere les dernieres transactions
    public function getRecenteTransaction(string $periode)
    {
        return $this->transactionRepository->recenteTransaction($periode);
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
