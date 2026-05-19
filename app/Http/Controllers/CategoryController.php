<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\categorie\CreateCategoryRequest;
use App\Services\CategorieService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        protected CategorieService $categorieService
    ) {}

    public function index()
    {
        $categories =  $this->categorieService->getCategories();

        return Inertia::render('Categorie/Index', [
            "categories" => $categories
        ]);
    }

    public function store(CreateCategoryRequest $request)
    {
        try {
            $data = $request->validated();

            $this->categorieService->createCategory($data);

            return response()->json(["success" => true, "message" => "Catégorie ajoutée avec succès"]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la création d'une categorie", ["erreur" => $e->getMessage()]);

            return response()->json(["success" => false, "message" => "Erreur lors de la création d'une categorie"]);
        }
    }
}
