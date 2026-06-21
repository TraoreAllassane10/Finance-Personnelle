<?php

namespace App\Http\Controllers;

use App\Enums\FrequenceTransactionEnum;
use App\Http\Requests\transaction_recurrente\CreateTransactionRecurrenteRequest;
use App\Http\Requests\transaction_recurrente\UpdateTransactionRecurrenteRequest;
use App\Models\TransactionRecurrente;
use App\Services\TransactionRecurrenteService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TransactionRecurrenteController extends Controller
{
    public function __construct(
        protected TransactionRecurrenteService $transactionRecurrenteService
    ) {}

    public function index()
    {
        $transactions = $this->transactionRecurrenteService->getTransactions();
        return Inertia::render('Transaction_recurrente/Index', [
            "transactions" => $transactions,
            "frequences" => FrequenceTransactionEnum::cases()
        ]);
    }

    public function store(CreateTransactionRecurrenteRequest $request)
    {
        try {
            $data = $request->validated();

            $transaction = $this->transactionRecurrenteService->createTransaction($data);

            return response()->json(['success' => true, 'message' => 'Transaction récurrente ajoutée avec succès', 'data' => $transaction]);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la creation d\'une transaction récurrente', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la creation d\'une transaction']);
        }
    }

    public function update(TransactionRecurrente $transaction, UpdateTransactionRecurrenteRequest $request)
    {
        try {
            $data = $request->validated();

            $transactionModifiee = $this->transactionRecurrenteService->updateTransaction($transaction, $data);

            return response()->json(['success' => true, 'message' => 'Transaction récurrente modifiée avec succès', 'data' => $transactionModifiee]);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la modification d\'une transaction récurrente', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la modification d\'une transaction']);
        }
    }

    public function destroy(TransactionRecurrente $transaction)
    {
        try {
            $this->transactionRecurrenteService->deleteTransaction($transaction);

            return response()->json(['success' => true, 'message' => 'Transaction récurrente supprimée avec succès']);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la suppression d\'une transaction récurrente', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la suppression d\'une transaction']);
        }
    }

    public function toggleActive(TransactionRecurrente $transaction) {
        try {
            $this->transactionRecurrenteService->toggleActive($transaction);
          
            return response()->json(['success' => true, 'message' => 'Mise à jour reussie']);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la mise à jour du champ active d\'une transaction recurrente', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la mise à jour d\'une transaction recurrente']);
        }
    }
}
