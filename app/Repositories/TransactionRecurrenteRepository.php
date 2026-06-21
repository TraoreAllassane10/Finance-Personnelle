<?php

namespace App\Repositories;

use App\Models\TransactionRecurrente;
use Illuminate\Support\Facades\Auth;

class TransactionRecurrenteRepository
{
    public function all()
    {
        return TransactionRecurrente::with('category')
            ->where('user_id', Auth::user()->id)
            ->get();
    }

    public function create(array $data)
    {
        return TransactionRecurrente::create($data);
    }

    public function update(TransactionRecurrente $transaction, array $data)
    {
        return $transaction->update($data);
    }

    public function delete(TransactionRecurrente $transaction)
    {
        return $transaction->delete();
    }

    public function toggleActive(TransactionRecurrente $transaction)
    {
       return $transaction->update([
            "active" => $transaction->active === 1 ? 0 : 1
        ]);
    }
}
