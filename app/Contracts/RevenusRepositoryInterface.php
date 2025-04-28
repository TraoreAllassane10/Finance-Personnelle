<?php

namespace App\Contracts;

interface RevenusRepositoryInterface
{
    public function allForUser(int $id);
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
