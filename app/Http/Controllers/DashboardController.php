<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Depense;
use App\Models\Revenus;
use App\Services\Chart\GroupByDate;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenus = 0;
        $totalDepenses = 0;

        $revenus = Revenus::where('user_id', Auth::id())->get();
        $depenses = Depense::where('user_id', Auth::id())->get();

        //La somme de tous les revenus
        for ($i=0; $i < $revenus->count(); $i++) {
            $totalRevenus += $revenus[$i]->montant;
        }

        //La somme de toutes les depenses
        for ($i=0; $i < $depenses->count(); $i++) {
            $totalDepenses += $depenses[$i]->montant;
        }

        //Graphique de revenus
        $revenusParDate = (new GroupByDate())->group($revenus);

        //Graphique de depense
        $depensesParDate = (new GroupByDate())->group($depenses);

        return Inertia::render('Dashboard', [
            "totalRevenus" =>  $totalRevenus,
            "totalDepenses" => $totalDepenses,
            "total" => $totalRevenus - $totalDepenses,
            "revenusChart" => $revenusParDate,
            "depensesChart" => $depensesParDate
        ]);
    }
}
