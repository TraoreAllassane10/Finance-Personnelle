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
                $query->whereMonth("date", now()->month)->sum("montant");
            }]);
        }])->get();
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
        return Budget::where('category_id', $categoryId)
            ->where('mois', $mois)
            ->where('annee', $annee)
            ->exists();
    }
}
