<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Contracts\EpargneRepositoryInterface;
use App\Http\Requests\EpargneRequest;
use App\Models\Epargne;

class EpargneServices
{
    private $epargneRepository;

    public function __construct(EpargneRepositoryInterface $epargneRepository)
    {
        $this->epargneRepository = $epargneRepository;
    }

    public function all()
    {
        $epargnes = $this->epargneRepository->allForUser(Auth::id());

        //Calcule le total des epargnes de ce mois
        $totalEpargne = $epargnes->map(function ($epargne) {
            return Carbon::parse($epargne['date'])->month == now()->month ? $epargne : null;
        })->sum('montant');

        return [$epargnes, $totalEpargne];
    }

    public function create(EpargneRequest $request)
    {
        $data = [
            'date' => $request->date,
            'montant' => $request->montant,
            'compte' => $request->compte,
            'projet' => $request->projet
        ];

        $this->epargneRepository->create($data);
    }

    public function update(Epargne $epargne, EpargneRequest $request)
    {
        if ($epargne && $epargne->user_id == Auth::id()) {

            $data = [
                "date" => $request->date,
                "montant" => $request->montant,
                "compte" => $request->compte,
                "projet" => $request->projet
            ];

            $this->epargneRepository->update($epargne->id, $data);
        }
    }

    public function delete($id)
    {
        $this->epargneRepository->delete($id);
    }
}
