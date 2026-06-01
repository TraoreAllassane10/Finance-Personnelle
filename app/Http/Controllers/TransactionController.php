<?php

namespace App\Http\Controllers;

use App\Http\Requests\transaction\CreateTransactionRequest;
use App\Http\Requests\transaction\UpdateTransactionRequest;
use App\Models\Transaction;
use App\Services\CategorieService;
use App\Services\TransactionService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function __construct(
        protected TransactionService $transactionService,
        protected CategorieService $categorieService
    ) {}

    public function revenus()
    {
        try {
            $revenus = $this->transactionService->revenus();
            $categories = $this->categorieService->getCategoriesDeRevenu();

            return Inertia::render('Revenus/Revenus', [
                "revenus" => $revenus,
                "categories" => $categories
            ]);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la recuperation des revenus', ['erreur' => $e->getMessage()]);
        }
    }

    public function depenses()
    {
        try {
            $depenses = $this->transactionService->depenses();
            $categories = $this->categorieService->getCategoriesDeDepense();

            return Inertia::render('Depenses/Depense', [
                "depenses" => $depenses,
                "categories" => $categories
            ]);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la recuperation des depenses', ['erreur' => $e->getMessage()]);
        }
    }

    public function show(Transaction $transaction)
    {
        try {
            // $transaction = $this->transactionService->getTransaction($id);

            return response()->json(['success' => true, 'data' => $transaction]);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la récuperation d\'une transaction', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la récuperation de la transaction']);
        }
    }

    public function update(Transaction $transaction, UpdateTransactionRequest $request)
    {
        try {
            $data = $request->validated();

            $transactionModifiee = $this->transactionService->updateTransaction($transaction, $data);

            return response()->json(['success' => true, 'message' => 'Transaction modifiée avec succès', 'data' => $transactionModifiee]);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la modification d\'une transaction', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la modification d\'une transaction']);
        }
    }

    public function store(CreateTransactionRequest $request)
    {
        try {
            $data = $request->validated();

            $transaction = $this->transactionService->createTransaction($data);

            return response()->json(['success' => true, 'message' => 'Transaction ajoutée avec succès', 'data' => $transaction]);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la creation d\'une transaction', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la creation d\'une transaction']);
        }
    }

    public function destroy(Transaction $transaction)
    {
        try {
            $this->transactionService->deleteTransaction($transaction);

            return response()->json(['success' => true, 'message' => 'Transaction supprimée avec succès']);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la suppression d\'une transaction', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la suppression d\'une transaction']);
        }
    }
}
