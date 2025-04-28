<?php

namespace App\Repositories;

use App\Models\Depense;
use Illuminate\Support\Facades\Auth;
use App\Contracts\DepenseRepositoryInterface;

class DepenseRepository implements DepenseRepositoryInterface
{

    private $model;

    public function __construct(Depense $depense)
    {
        $this->model = $depense;
    }

    public function allForUser(int $id)
    {
        return $this->model->where('user_id', $id)->latest()->get();
    }

    public function create($data)
    {
        $this->model->date = $data['date'];
        $this->model->montant = $data['montant'];
        $this->model->category_id = $data['category_id'];
        $this->model->description = $data['description'];
        $this->model->user_id = Auth::id();

        return $this->model->save();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function update($id, array $data)
    {
        $depense = $this->find($id);

        if($depense)
        {
            $this->model->date = $data['date'];
            $this->model->montant = $data['montant'];
            $this->model->category_id = $data['category_id'];
            $this->model->description = $data['description'];
            $this->model->user_id = Auth::id();

            return $this->model->save();
        }

        return null;
    }

    public function delete($id)
    {
        $depense = $this->find($id);

        if ($depense)
        {
            return $depense->delete();
        }

        return null;
    }
}
