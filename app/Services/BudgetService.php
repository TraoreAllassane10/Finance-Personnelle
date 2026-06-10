<?php

namespace App\Services;

use App\Models\Budget;
use App\Repositories\BudgetRepository;

class BudgetService
{

    public function __construct(
        protected BudgetRepository $budgetRepository
    ) {}

    public function getBudgets()
    {
        return $this->budgetRepository->all();
    }

    public function getMontantTotalBudget() {
        return $this->budgetRepository->montantTotalAlloue();
    }

    public function getMontantTotalDepenseDansBudget() {
        return $this->budgetRepository->montantTotalDepense();
    }

    public function createBudget(array $data)
    {
        $mois = now()->month;
        $annee = now()->year;

        $budgetExist = $this->budgetRepository->budgetExiste($data['category_id'], $mois, $annee);

        if ($budgetExist) {
            return null;
        }

        return $this->budgetRepository->create($data, $mois, $annee);
    }

    public function deleteBudget(Budget $budget) {
        return $this->budgetRepository->delete($budget);
    }
}
