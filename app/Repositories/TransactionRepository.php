<?php

namespace App\Repositories;

use App\Enums\TypeTransaction;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class TransactionRepository
{

    public function all()
    {
        return Transaction::with('category')
        ->where('user_id', Auth::user()->id)
        ->orderBy('date')
        ->get();
    }

    public function allRevenu()
    {
        return $this->fetchTransaction(TypeTransaction::REVENU->value);
    }

    public function allDepense()
    {
        return $this->fetchTransaction(TypeTransaction::DEPENSE->value);
    }

    public function fetchTransaction(string $typeTransaction)
    {
        return Transaction::with('category')
            ->where('user_id', Auth::user()->id)
            ->where('type', $typeTransaction)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function montantTotalDepense()
    {
        return Transaction::where("type", TypeTransaction::DEPENSE->value)->sum("montant");
    }

    public function montantTotalRevenu()
    {
        return Transaction::where("type", TypeTransaction::REVENU->value)->sum("montant");
    }

    public function recenteTransaction()
    {
        return Transaction::where("user_id", Auth::user()->id)
            ->latest()
            ->limit(5)
            ->get();
    }

    public function find(string $id)
    {
        return Transaction::find($id);
    }

    public function create(array $data)
    {
        return Transaction::create($data);
    }

    public function update(Transaction $transaction, array $data)
    {
        return $transaction->update($data);
    }

    public function delete(Transaction $transaction)
    {
        return $transaction->delete();
    }
}
