<?php

namespace App\Services\Chat;

use App\Models\User;
use App\Services\BudgetService;
use App\Services\CategorieService;
use App\Services\ObjectifEpargneService;
use App\Services\TransactionService;

/**
 * Construire le context financier
 */

class UserFinancialContext
{

    public function __construct(
        protected TransactionService $transactionService,
        protected CategorieService $categorieService,
        protected BudgetService $budgetService,
        protected ObjectifEpargneService $objectifEpargneService
    ) {}

    public function build(User $user): string
    {
        $totalRevenu = $this->transactionService->getMontantTotalRevenu("mois");
        $totalDepense = $this->transactionService->getMontantTotalDepense("mois");
        $categorieRevenus = $this->categorieService->getCategoriesDeRevenu();
        $categorieDepenses = $this->categorieService->getCategoriesDeDepense();
        $budgets = $this->budgetService->getBudgets();
        $montantTotalBudget = $this->budgetService->getMontantTotalBudget();
        $montantTotalDepenseDansLeBudget = $this->budgetService->getMontantTotalDepenseDansBudget();
        $transactionMensuelles = $this->transactionService->getTransactionParPeriode("mois");
        $transactionAnnuelles = $this->transactionService->getTransactionParPeriode('annee');
        $ObjectifEpargne = $this->objectifEpargneService->getObjectifEpargnes();

        return <<<TEXT

Utilisateur : {$user->name}

Devise : FCFA

Revenu mensuel : {$totalRevenu}

Dépenses du mois : {$totalDepense}

Mes Catégories de révenus: {$categorieRevenus}

Mes Catégories de depenses: {$categorieDepenses}

Mes budgets: {$budgets} , le total dépense dans chaque budget est representé par : montant_depense

Le Montant total de mes budgets est {$montantTotalBudget} et j'ai depensé {$montantTotalDepenseDansLeBudget}

Voici toutes mes transactions de ce mois-ci : {$transactionMensuelles}. Elles ont une diférence au niveau de l'attribut type.

Voici toute mes transactions de cette année :{$transactionAnnuelles}  

Mes objectifs d'epargne: {$ObjectifEpargne} , le total epargné dans chaque objectif est representé par : montant_total_epargne

TEXT;
    }
}
