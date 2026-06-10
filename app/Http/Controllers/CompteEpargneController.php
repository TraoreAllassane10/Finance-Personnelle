<?php

namespace App\Http\Controllers;

use App\Services\CompteEpargneServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CompteEpargneController extends Controller
{
    public function __construct(
        protected CompteEpargneServices $compteEpargneServices
    ) {}

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nom' => 'required|string'
            ]);

            $this->compteEpargneServices->createCompteEpargne($validated);

            return response()->json(["success" => true, "message" => "Compte d'epargnes crée avec succès !"]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la création d'un compte d'epargne", ["erreur" => $e->getMessage()]);

            return response()->json(["success" => false, "message" => "Erreur lors de la création d'un compte d'epargne"]);
        }
    }
}
