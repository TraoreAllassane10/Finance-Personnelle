<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Category;
use App\Services\Chart\GroupByDate;
use Illuminate\Support\Facades\Auth;
use App\Contracts\DepenseRepositoryInterface;
use App\Http\Requests\DepenseRequest;
use App\Models\Depense;

class DepenseServices
{
    private $depenseRepository;

    public function __construct(DepenseRepositoryInterface $depenseRepository)
    {
        $this->depenseRepository = $depenseRepository;
    }

    public function all()
    {
        $categories = Category::all();

        $depenses = $this->depenseRepository->allForUser(Auth::id());

        //Calcule le total des depenses de ce mois
        $totalDepense = $depenses->map(function ($depense) {
            return Carbon::parse($depense['date'])->month == now()->month ? $depense : null;
        })->sum('montant');


        $depensesParDate = (new GroupByDate())->group($depenses);

        return [$depenses, $categories, $depensesParDate, $totalDepense];
    }

    public function create(DepenseRequest $request)
    {
        $data = [
            "date" => $request->date,
            "montant" => $request->montant,
            "category_id" => $request->category_id,
            "description" => $request->description
        ];

        $this->depenseRepository->create($data);
    }

    public function update(Depense $depense, DepenseRequest $request)
    {
        if ($depense && $depense->user_id == Auth::id()) {

            $data = [
                "date" => $request->date,
                "montant" => $request->montant,
                "category_id" => $request->category_id,
                "description" => $request->description
            ];

            $this->depenseRepository->update($depense->id, $data);
        }
    }

    public function delete($id)
    {
        $this->depenseRepository->delete($id);
    }
}
