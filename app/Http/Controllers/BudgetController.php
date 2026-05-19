<?php

namespace App\Http\Controllers;

use App\Http\Requests\budget\CreateBudgetRequest;
use App\Services\BudgetService;
use App\Services\CategorieService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function __construct(
        protected CategorieService $categorieService,
        protected BudgetService $budgetService
    ) {}

    public function index()
    {
        $categories = $this->categorieService->getCategories();
        $budgets = $this->budgetService->getBudgets();

        return Inertia::render('Budget/Index', [
            'categories' => $categories,
            'budgets' => $budgets
        ]);
    }

    public function store(CreateBudgetRequest $request)
    {
        try {
            $data = $request->validated();

            $budget = $this->budgetService->createBudget($data);

            if (! $budget) {
                return response()->json(['success' => false, 'message' => 'Le budget de cette categorie pour ce mois ci est déjà défini']);
            }

            return response()->json(["success" => true, "message" => "Budget ajouté avec succès"]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la création d'un budget", ["erreur" => $e->getMessage()]);

            return response()->json(["success" => false, "message" => "Erreur lors de la création d'un budget"]);
        }
    }
}
