<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Revenus;
use App\Repositories\Eloquent\RevenusRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RevenusController extends Controller
{

    public function index()
    {
        return Inertia::render('Revenus/Revenus', ["revenus" => Revenus::where('user_id', Auth::id())->get(), "categories" => Category::all()]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ]);

        $revenus = new Revenus();

        $revenus->date = $validated["date"];
        $revenus->montant = $validated["montant"];
        $revenus->category_id = $validated["category_id"];
        $revenus->description = $validated["description"];
        $revenus->user_id = Auth::id();

        $revenus->save();

        return redirect()->back()->with('success', 'Un revenus ajouté');
    }

    public function edit(Revenus $revenu)
    {
        return Inertia::render('Revenus/Edit', ["revenu" => $revenu, "categories" => Category::all()]);
    }

    public function update(Request $request, Revenus $revenu)
    {
        $validated = $request->validate([
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ]);

        if($revenu && $revenu->user_id == Auth::id())
        {
            $revenu->date = $validated['date'];
            $revenu->montant =  $validated['montant'];
            $revenu->category_id = $validated['category_id'];
            $revenu->description =  $validated['description'];

            $revenu->save();

            return redirect()->route("revenus");
        }
    }

    public function destroy(Revenus $revenu)
    {
        if ($revenu)
        {
            $revenu->delete();
            return redirect()->back()->with('success', "Revenu supprimé");
        }
    }
}
