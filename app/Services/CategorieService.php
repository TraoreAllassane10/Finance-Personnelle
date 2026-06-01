<?php

namespace App\Services;

use App\Repositories\CategorieRepository;

class CategorieService
{

    public function __construct(
        protected CategorieRepository $categorieRepository
    ) {}

    public function getCategories()
    {
        return $this->categorieRepository->all();
    }

    public function getCategoriesDeRevenu()
    {
        return $this->categorieRepository->categoriesDeRevenu();
    }

    public function getCategoriesDeDepense()
    {
        return $this->categorieRepository->categoriesDeDepense();
    }

    public function createCategory(array $data)
    {
        return $this->categorieRepository->store($data);
    }
}
