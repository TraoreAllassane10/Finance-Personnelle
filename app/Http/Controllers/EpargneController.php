<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\CompteEpargneServices;
use App\Services\EpargneServices;
use App\Services\ObjectifEpargneService;
use App\Services\VersementService;

class EpargneController extends Controller
{
    public function __construct(
        protected EpargneServices $epargneServices,
        protected CompteEpargneServices $compteEpargneServices,
        protected ObjectifEpargneService $objectifEpargneService,
        protected VersementService $versementService
    ) {}

    public function index()
    {
        $comptesEpargnes = $this->compteEpargneServices->getCompteEpargnes();
        $objectifEpargnes = $this->objectifEpargneService->getObjectifEpargnes();
        $versements = $this->versementService->getVersements();

        return Inertia::render('Epargnes/Epargnes', [
            "compte_epargnes" => $comptesEpargnes,
            "objectif_epargnes" => $objectifEpargnes,
            "versements" => $versements
        ]);
    }

}
