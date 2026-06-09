<?php

namespace App\Repositories;

use App\Models\Versement;
use Illuminate\Support\Facades\Auth;

class VersementRepository
{

    public function all()
    {
        return Versement::all();
    }

    public function create(array $data)
    {
        return Versement::create($data);
    }

    public function totalVersement()
    {
        return Versement::where('user_id', Auth::user()->id)
            ->sum("montant_verse");
    }

    public function totalVersementParPeriode(string $periode)
    {
        $query = Versement::where('user_id', Auth::user()->id);

        if ($periode == "annee") {
            $query->whereYear("date", now()->year);
        } else {
            $query->whereMonth("date", now()->month)
                ->whereYear("date", now()->year);
        }

        return $query->sum("montant_verse");
    }
}
