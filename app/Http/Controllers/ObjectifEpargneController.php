<?php

namespace App\Http\Controllers;

use App\Http\Requests\objectif_epargne\CreateObjectifEpargneRequest;
use App\Services\ObjectifEpargneService;
use Exception;
use Illuminate\Support\Facades\Log;

class ObjectifEpargneController extends Controller
{
    public function __construct(
        protected ObjectifEpargneService $objectifEpargneService
    ) {}

    public function store(CreateObjectifEpargneRequest $request)
    {
        try {
            $data = $request->validated();

            $this->objectifEpargneService->createObjectifEpargne($data);

            return response()->json(["success" => true, "message" => "Objectif d'epargne crée avec succès"]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la création d'un objectif d'epargne", ["erreur" => $e->getMessage()]);

            return response()->json(["success" => false, "message" => "Erreur lors de la création d'un objectif d'epargne"]);
        }
    }
}
