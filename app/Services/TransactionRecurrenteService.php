<?php

namespace App\Services;

use App\Enums\FrequenceTransactionEnum;
use App\Models\TransactionRecurrente;
use App\Repositories\TransactionRecurrenteRepository;
use Carbon\Carbon;
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
        // Calcule de la date d'execution de la transaction recurrente
        // $next_run_at = null;
        // switch ($data['frequence']) {
        //     case FrequenceTransactionEnum::QUOTIDIENNE->value:
        //         $next_run_at = now()->addDay();
        //         break;

        //     case FrequenceTransactionEnum::HEBDOMADAIRE->value:
        //         $next_run_at = now()->addWeek();
        //         break;

        //     case FrequenceTransactionEnum::MENSUELLE->value:
        //         $next_run_at = now()->addMonth();
        //         break;

        //     case FrequenceTransactionEnum::ANNUELLE->value:
        //         $next_run_at = now()->addYear();
        //         break;
        // }

        $data['next_run_at'] = now();
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
