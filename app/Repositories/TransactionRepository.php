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

    public function  transactionParPeriode(string $periode)
    {
        $query = Transaction::with('category')
            ->where('user_id', Auth::user()->id);

        if ($periode == "annee") {
            $query->whereYear("date", now()->year);
        } else {
            $query->whereMonth("date", now()->month);
        }

        return $query
            ->orderBy('date')
            ->get();
    }

    public function allRevenu(string|null $year, string|null $month, string|null $categorie)
    {
        return $this->fetchTransaction(TypeTransaction::REVENU->value, $year, $month, $categorie);
    }

    public function allDepense(string|null $year, string|null $month, string|null $categorie)
    {
        return $this->fetchTransaction(TypeTransaction::DEPENSE->value, $year, $month, $categorie);
    }

    public function fetchTransaction(string $typeTransaction, string|null $year, string|null $month, string|null $categorie)
    {
        $query = Transaction::query()->with('category');

        $query
            ->when($year, function ($query) use ($year) {
                $query->whereYear("date", $year);
            })
            ->when($month, function ($query) use ($month) {
                $query->whereMonth("date", $month);
            })
            ->when($categorie, function ($query) use ($categorie) {
                $query->where("category_id", $categorie);
            });

        return $query
            ->where('user_id', Auth::user()->id)
            ->where('type', $typeTransaction)
            ->orderBy('created_at', 'desc')
            ->get();

        // return Transaction::with('category')
        //     ->where('user_id', Auth::user()->id)
        //     ->whereMonth("date", now()->month)
        //     ->where('type', $typeTransaction)
        //     ->orderBy('created_at', 'desc')
        //     ->get();
    }

    public function montantTotalDepense(string $periode)
    {
        $query = Transaction::where("type", TypeTransaction::DEPENSE->value)
            ->where('user_id', Auth::user()->id);

        if ($periode == "annee") {
            $query->whereYear("date", now()->year);
        } else {
            $query->whereMonth("date", now()->month);
        }

        return  $query->sum("montant");
    }

    public function montantTotalRevenu(string $periode)
    {
        $query = Transaction::where("type", TypeTransaction::REVENU->value)
            ->where('user_id', Auth::user()->id);

        if ($periode == "annee") {
            $query->whereYear("date", now()->year);
        } else {
            $query->whereMonth("date", now()->month);
        }

        return $query->sum("montant");
    }

    public function recenteTransaction(string $periode)
    {
        $query = Transaction::where("user_id", Auth::user()->id);

        if ($periode == "annee") {
            $query->whereYear("date", now()->year);
        } else {
            $query->whereMonth("date", now()->month);
        }

        return $query->latest()
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
