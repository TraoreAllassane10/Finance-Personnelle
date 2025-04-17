<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate(['categorie' => 'required|string']);
        $categorie = new Category();
        $categorie->name = $validated['categorie'];
        $categorie->save();

        return redirect()->route('dashboard');
    }
}
