<?php

namespace App\Http\Controllers;

use App\Enums\TypeTransaction;
use Inertia\Inertia;
use App\Services\TransactionService;

class DashboardController extends Controller
{

    public function __construct(
        protected TransactionService $transactionService
    ) {}
    public function index()
    {
        // Les statistiques
        $totalRevenu = $this->transactionService->getMontantTotalRevenu();
        $totalDepense = $this->transactionService->getMontantTotalDepense();

        // Les 5 dernieres transactions
        $recenteTransactions = $this->transactionService->getRecenteTransaction();

        // Les données pour les graphiques
        $transactions = $this->transactionService->getTransactions();

        $transactionParDate = $transactions->groupBy("date")->map(function ($transactions, $date) {
            return [
                'date' => $date,
                'revenu' => $transactions->where("type", TypeTransaction::REVENU->value)->sum('montant'),
                'depense' => $transactions->where("type", TypeTransaction::DEPENSE->value)->sum('montant'),
            ];
        })->values();

        return Inertia::render('Dashboard', [
            "totalRevenu" =>  $totalRevenu,
            "totalDepense" => $totalDepense,
            "soldeNet" => $totalRevenu - $totalDepense,
            "totalEpargne" => 0,
            "recenteTransactions" => $recenteTransactions,

            "chartData" => [
                "transactionParDate" => $transactionParDate
            ]
        ]);
    }
}
