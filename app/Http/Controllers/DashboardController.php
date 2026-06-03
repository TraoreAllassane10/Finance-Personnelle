<?php

namespace App\Http\Controllers;

use App\Enums\TypeTransaction;
use Inertia\Inertia;
use App\Services\TransactionService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function __construct(
        protected TransactionService $transactionService
    ) {}
    public function index(Request $request)
    {
        $periode = $request->periode ?? "mois";

        // Les statistiques
        $totalRevenu = $this->transactionService->getMontantTotalRevenu($periode);
        $totalDepense = $this->transactionService->getMontantTotalDepense($periode);

        // Les 5 dernieres transactions
        $recenteTransactions = $this->transactionService->getRecenteTransaction($periode);

        $transactions = $this->transactionService->getTransactions();

        // Regroupement des données par Date pour le graph de comparaison des depense et revenus
        $transactionParDate = $transactions->groupBy("date")
            ->map(function ($transactions, $date) {
                return [
                    'date' => $date,
                    'revenu' => $transactions->where("type", TypeTransaction::REVENU->value)->sum('montant'),
                    'depense' => $transactions->where("type", TypeTransaction::DEPENSE->value)->sum('montant'),
                ];
            })->values();

        // Regroupement des transactions par categorie
        $transactioParPeriode = $this->transactionService->getTransactionParPeriode($periode);
        $transactionParCategorie = $transactioParPeriode->where('type', TypeTransaction::DEPENSE->value)->groupBy('category_id')
            ->map(function ($transactions, $categorieId) {
                return [
                    'categorie' => $transactions[0]->category->nom,
                    'montant' => $transactions->sum('montant'),
                    'fill' => $transactions[0]->category->couleur
                ];
            })->values();

        return Inertia::render('Dashboard', [
            "totalRevenu" =>  $totalRevenu,
            "totalDepense" => $totalDepense,
            "soldeNet" => $totalRevenu - $totalDepense,
            "totalEpargne" => 0,
            "recenteTransactions" => $recenteTransactions,
            "periodeSelected" => $periode,
            "chartData" => [
                "transactionParDate" => $transactionParDate,
                "transactionParCategorie" => $transactionParCategorie
            ]
        ]);
    }
}
