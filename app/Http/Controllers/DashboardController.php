<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Depense;
use App\Models\Revenus;
use Illuminate\Http\Request;
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
        $revenusParDate = $revenus->groupBy(function($revenu) {
            return Carbon::parse($revenu->date)->format("Y-m");
        })->map(function ($items, $mois){
            return [
                'mois' => Carbon::parse($mois)->translatedFormat("F Y"), // Ex : Avril 2025
                "total" => $items->sum('montant')
            ];
        })->values();

        //Graphique de depense
        $depensesParDate = $depenses->groupBy(function($depense) {
            return Carbon::parse($depense->date)->format('Y-m');
        })->map(function($items, $mois){
            return [
                "mois" => Carbon::parse($mois)->translatedFormat('F Y'),
                "total" => $items->sum('montant')
            ];
        })->values();

        return Inertia::render('Dashboard', [
            "totalRevenus" =>  $totalRevenus,
            "totalDepenses" => $totalDepenses,
            "total" => $totalRevenus - $totalDepenses,
            "revenusChart" => $revenusParDate,
            "depensesChart" => $depensesParDate
        ]);
    }
}
