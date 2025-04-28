<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use App\Contracts\DepenseRepositoryInterface;
use App\Contracts\EpargneRepositoryInterface;
use App\Models\Epargne;

class EpargnesRepository implements EpargneRepositoryInterface
{

    private $model;

    public function __construct(Epargne $epargne)
    {
        $this->model = $epargne;
    }

    public function allForUser(int $id)
    {
        return $this->model->where('user_id', $id)->latest()->get();
    }

    public function create($data)
    {
        $this->model->date = $data['date'];
        $this->model->montant = $data['montant'];
        $this->model->compte = $data['compte'];
        $this->model->projets = $data['projet'];
        $this->model->user_id = Auth::id();

        return $this->model->save();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function update($id, array $data)
    {
        $epargne = $this->find($id);

        if ($epargne) {

            $epargne->date = $data['date'];
            $epargne->montant = $data['montant'];
            $epargne->compte = $data['compte'];
            $epargne->projets = $data['projet'];
            $epargne->user_id = Auth::id();

            return $epargne->save();
        }

        return null;
    }

    public function delete($id)
    {
        $epargne = $this->find($id);

        if ($epargne) {
            return $epargne->delete();
        }

        return null;
    }
}
