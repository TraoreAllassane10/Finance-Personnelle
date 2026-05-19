<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategorieRepository
{

    public function all()
    {
        return Category::all();
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
