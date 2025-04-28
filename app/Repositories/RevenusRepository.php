<?php

namespace App\Repositories;

use App\Models\Revenus;
use App\Contracts\RevenusRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class RevenusRepository implements RevenusRepositoryInterface
{
    protected $model;

    public function __construct(Revenus $revenus)
    {
        $this->model = $revenus;
    }

    public function allForUser(int $id)
    {
        return $this->model->where('user_id', $id)->latest()->get();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        $this->model->date = $data['date'];
        $this->model->montant = $data['montant'];
        $this->model->category_id = $data['category_id'];
        $this->model->description = $data['description'];
        $this->model->user_id = Auth::id();

        return $this->model->save();
    }

    public function update($id, array $data)
    {

        $revenu = $this->find($id);

        if($revenu)
        {

            $revenu->date = $data['date'];
            $revenu->montant = $data['montant'];
            $revenu->category_id = $data['category_id'];
            $revenu->description = $data['description'];
            $revenu->user_id = Auth::id();

            return $revenu->save();
        }

        return null;
    }

    public function delete($id)
    {
        $revenu = $this->find($id);

        if($revenu)
        {
            return $revenu->delete();
        }

        return false;
    }
}
