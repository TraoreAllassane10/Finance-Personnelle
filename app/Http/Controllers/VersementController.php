<?php

namespace App\Http\Controllers;

use App\Http\Requests\versement\CreateVersementRequest;
use App\Services\VersementService;
use Exception;
use Illuminate\Support\Facades\Log;

class VersementController extends Controller
{
    public function __construct(
        protected VersementService $versementService
    ) {}

    public function store(CreateVersementRequest $request)
    {
        try {
            $data = $request->validated();

            $this->versementService->createVersement($data);

            return response()->json(["success" => true, "message" => "Versement enregistré avec succès"]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la création d'un versement", ["erreur" => $e->getMessage()]);

            return response()->json(["success" => false, "message" => "Erreur lors de la création d'un versement"]);
        }
    }
}
