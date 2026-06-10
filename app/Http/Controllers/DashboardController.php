<?php

namespace App\Http\Controllers;

use App\Enums\TypeTransaction;
use App\Services\ObjectifEpargneService;
use Inertia\Inertia;
use App\Services\TransactionService;
use App\Services\VersementService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function __construct(
        protected TransactionService $transactionService,
        protected VersementService $versementService,
        protected ObjectifEpargneService $objectifEpargneService
    ) {}
    public function index(Request $request)
    {
        $periode = $request->periode ?? "mois";

        // Les statistiques
        $totalRevenu = $this->transactionService->getMontantTotalRevenu($periode);
        $totalDepense = $this->transactionService->getMontantTotalDepense($periode);
        $totalEpargne = $this->versementService->getMontantTotalVersementParPeriode($periode);

        // Les 5 dernieres transactions
        $recenteTransactions = $this->transactionService->getRecenteTransaction($periode);

        // Les objectifs active
        $objectifs_epargnes = $this->objectifEpargneService->getObjectifEpargnes();

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


        // Calcule de variation par rapport au mois dernier
        $montantTotalRevenuMoisDernier = $this->transactionService->getMontantTotalRevenuMoisDernier();
        $montantTotalDepenseMoisDernier = $this->transactionService->getMontantTotalDepenseMoisDernier();

        $variationRevenu = $montantTotalRevenuMoisDernier > 0 ? (($totalRevenu - $montantTotalRevenuMoisDernier) / $montantTotalRevenuMoisDernier) * 100 : 0;
        $variationDepense = $montantTotalDepenseMoisDernier > 0 ? (($totalDepense - $montantTotalDepenseMoisDernier) / $montantTotalDepenseMoisDernier) * 100 : 0;

        return Inertia::render('Dashboard', [
            "totalRevenu" =>  $totalRevenu,
            "variationRevenu" => $variationRevenu,
            "totalDepense" => $totalDepense,
            "variationDepense" => $variationDepense,
            "soldeNet" => $totalRevenu - $totalDepense,
            "totalEpargne" => $totalEpargne,
            "recenteTransactions" => $recenteTransactions,
            "objectifs_epargnes" => $objectifs_epargnes,
            "periodeSelected" => $periode,
            "chartData" => [
                "transactionParDate" => $transactionParDate,
                "transactionParCategorie" => $transactionParCategorie
            ]
        ]);
    }
}
