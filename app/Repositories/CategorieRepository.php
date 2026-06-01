<?php

namespace App\Repositories;

use App\Enums\TypeTransaction;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategorieRepository
{

    public function all()
    {
        return Category::where('user_id', Auth::user()->id)
            ->withCount('transactions')->get();
    }

    public function categoriesDeRevenu()
    {
        return Category::where('user_id', Auth::user()->id)
            ->where('type', TypeTransaction::REVENU->value)
            ->get();
    }

    public function categoriesDeDepense()
    {
        return Category::where('user_id', Auth::user()->id)
            ->where('type', TypeTransaction::DEPENSE->value)
            ->get();
    }

    public function store(array $data)
    {
        return Category::create([
            'nom' => $data['nom'],
            'type' => $data['type'],
            'couleur' => $data['couleur'],
            'icon' => $data['icon'],
            'user_id' => Auth::user()->id,
        ]);
    }
}
