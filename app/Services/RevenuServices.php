<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Revenus;
use App\Models\Category;
use App\Services\Chart\GroupByDate;
use Illuminate\Support\Facades\Auth;
use App\Repositories\RevenusRepository;

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

        // $revenus = $this->revenuRepository->allForUser(Auth::id());
        $revenus = (new RevenusRepository(new Revenus()))->allForUser(Auth::id());
        //Calcule le total des revenus de ce mois
        $totalRevenus = $revenus->map(function($revenu) {
            return Carbon::parse($revenu['date'])->month == now()->month ? $revenu : null;
        })->sum('montant');

        $revenusParDate = (new GroupByDate())->group($revenus);

        return [$revenus,$revenusParDate, $categories, $totalRevenus];
    }

    public function find()
    {

    }

    public function create()
    {

    }
    public function update()
    {

    }

    public function delete()
    {

    }
}
