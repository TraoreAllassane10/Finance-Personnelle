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
                $query->whereMonth("date", now()->month);
            }])->withSum("transactions as montant_depense", "montant");
        }])
            ->where('user_id', Auth::user()->id)
            ->where('mois', now()->month)
            ->where('annee', now()->year)
            ->get();
    }

    public function montantTotalAlloue() {
        return Budget::sum("montant_alloue");
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

    public function budgetExiste(mixed $categoryId, int $mois, int $annee,)
    {
        return Budget::where("user_id", Auth::user()->id)
            ->where('category_id', $categoryId)
            ->where('mois', $mois)
            ->where('annee', $annee)
            ->exists();
    }
}
