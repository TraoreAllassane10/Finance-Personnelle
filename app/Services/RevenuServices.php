<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Category;
use App\Services\Chart\GroupByDate;
use Illuminate\Support\Facades\Auth;
use App\Contracts\RevenusRepositoryInterface;
use App\Http\Requests\RevenuRequest;
use App\Models\Revenus;

class RevenuServices
{
    protected $revenuRepository;

    public function __construct(RevenusRepositoryInterface $revenuRepository)
    {
        $this->revenuRepository = $revenuRepository;
    }

    public function all()
    {
        $categories = Category::all();

        $revenus = $this->revenuRepository->allForUser(Auth::id());

        //Calcule le total des revenus de ce mois
        $totalRevenus = $revenus->map(function ($revenu) {
            return Carbon::parse($revenu['date'])->month == now()->month ? $revenu : null;
        })->sum('montant');

        $revenusParDate = (new GroupByDate())->group($revenus);

        return [$revenus, $revenusParDate, $categories, $totalRevenus];
    }

    public function find() {}

    public function create(RevenuRequest $request)
    {
        $data = [
            "date" => $request->date,
            "montant" => $request->montant,
            "category_id" => $request->category_id,
            "description" => $request->description
        ];

        $this->revenuRepository->create($data);
    }

    public function update(Revenus $revenu, RevenuRequest $request)
    {
        if ($revenu && $revenu->user_id == Auth::id()) {

            $data = [
                "date" => $request->date,
                "montant" => $request->montant,
                "category_id" => $request->category_id,
                "description" => $request->description
            ];

            $this->revenuRepository->update($revenu->id, $data);
        }
    }

    public function delete($id)
    {
        $this->revenuRepository->delete($id);
    }
}
