<?php

namespace App\Services\Chart;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class GroupByDate
{
    public function group(Collection $data)
    {
        $ParDate = $data->groupBy(function ($dt) {
            return Carbon::parse($dt->date)->format("Y-m");
        })->map(function ($items, $mois) {
            return [
                'mois' => Carbon::parse($mois)->translatedFormat("F Y"), // Ex : Avril 2025
                "total" => $items->sum('montant')
            ];
        })->values();

        return $ParDate;
    }
}
