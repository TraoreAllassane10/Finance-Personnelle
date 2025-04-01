<?php

namespace App\Http\Controllers;

use App\Models\Depense;
use App\Models\Revenus;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenus = 0;
        $totalDepenses = 0;

        $revenus = Revenus::all();
        $depenses = Depense::all();

        //La somme de tous les revenus
        for ($i=0; $i < $revenus->count(); $i++) {
            $totalRevenus += $revenus[$i]->montant;
        }

        //La somme de toutes les depenses
        for ($i=0; $i < $depenses->count(); $i++) {
            $totalDepenses += $depenses[$i]->montant;
        }

        return Inertia::render('Dashboard', [
            "totalRevenus" =>  $totalRevenus,
            "totalDepenses" => $totalDepenses,
            "total" => $totalRevenus - $totalDepenses
        ]);
    }
}
