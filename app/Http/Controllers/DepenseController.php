<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Depense;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepenseController extends Controller
{

    public function index()
    {
        $depenses = Depense::where('user_id', Auth::id())->get();
        $categories = Category::all();

        $depensesParDate = $depenses->groupBy(function($depense) {
            return Carbon::parse($depense->date)->format('Y-m');
        })->map(function($items, $mois){
            return [
                "mois" => Carbon::parse($mois)->translatedFormat('F Y'),
                "total" => $items->sum('montant')
            ];
        })->values();

        return Inertia::render('Depenses/Depense', [
            "depenses" => $depenses,
            "categories" => $categories,
            "depensesChart" => $depensesParDate
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ]);

        $depense = new Depense();

        $depense->date = $validated["date"];
        $depense->montant = $validated["montant"];
        $depense->category_id = $validated["category_id"];
        $depense->description = $validated["description"];
        $depense->user_id = Auth::id();

        $depense->save();

        return redirect()->back()->with('success', 'Un revenus ajouté');
    }

    public function edit(Depense $depense)
    {
        return Inertia::render('Depenses/Edit', ["depense" => $depense, "categories" => Category::all()]);
    }

    public function update(Request $request, Depense $depense)
    {
        $validated = $request->validate([
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ]);

        if ($depense && $depense->user_id == Auth::id()) {
            $depense->date = $validated['date'];
            $depense->montant =  $validated['montant'];
            $depense->category_id = $validated['category_id'];
            $depense->description =  $validated['description'];

            $depense->save();

            return redirect()->route("depenses");
        }
    }

    public function destroy(Depense $depense)
    {
        if ($depense) {
            $depense->delete();
            return redirect()->back()->with('success', "Revenu supprimé");
        }
    }
}
