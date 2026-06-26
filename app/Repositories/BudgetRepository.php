<?php

namespace App\Repositories;

use App\Models\Budget;
use Illuminate\Support\Facades\Auth;

class BudgetRepository
{

    public function all()
    {
        return Budget::with(['category' => function ($query) {
            $query->with(["transactions" => function ($query) {
                $query->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year);
            }])
                ->withSum([
                    "transactions as montant_depense" => function ($query) {
                        $query->whereMonth('date', now()->month)
                            ->whereYear('date', now()->year);
                    }
                ], "montant");
        }])
            ->where('user_id', Auth::user()->id)
            ->where('mois', now()->month)
            ->where('annee', now()->year)
            ->get();
    }

    public function montantTotalAlloue()
    {
        return Budget::where('user_id', Auth::user()->id)
            ->where('mois', now()->month)
            ->sum("montant_alloue");
    }

    // Montant total des depenses dans les budgets definir 
    // Certaines catégorie peuvent ne pas avoir de budget donc leurs transactions ne doit pas etre dans ce total 
    public function montantTotalDepense()
    {
        $montantTotalDepense = $this->all()->reduce(function ($curry, $item) {
            return $curry + $item->category->montant_depense;
        }, 0);

        return $montantTotalDepense;
    }

    public function create(array $data, int $mois, int $annee)
    {
        return Budget::create([
            "montant_alloue" => $data['montant_alloue'],
            "category_id" => $data['category_id'],
            "mois" => $mois,
            "annee" => $annee,
            "user_id" => Auth::user()->id
        ]);
    }

    public function budgetExiste(mixed $categoryId, int $mois, int $annee)
    {
        return Budget::where("user_id", Auth::user()->id)
            ->where('category_id', $categoryId)
            ->where('mois', $mois)
            ->where('annee', $annee)
            ->exists();
    }

    public function findBudget(mixed $budgetId)
    {
        return Budget::with(['category' => function ($query) {
            $query->with(["transactions" => function ($query) {
                $query->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year);
            }])
                ->withSum([
                    "transactions as montant_depense" => function ($query) {
                        $query->whereMonth('date', now()->month)
                            ->whereYear('date', now()->year);
                    }
                ], "montant");
        }])
            ->find($budgetId);
    }

    public function delete(Budget $budget)
    {
        return $budget->delete();
    }
}
