<?php

namespace App\Repositories\Eloquent;

use App\Models\Revenus;
use App\Repositories\Contracts\RevenusRepositoryInterface;

class RevenusRepository implements RevenusRepositoryInterface
{
    protected $model;

    public function __construct(Revenus $revenus)
    {
        $this->model = $revenus;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $revenu = $this->find($id);

        if($revenu)
        {
            return $revenu->update($data);
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
