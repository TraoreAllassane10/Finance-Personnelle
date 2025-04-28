<?php

namespace App\Providers;

use App\Contracts\DepenseRepositoryInterface;
use App\Contracts\EpargneRepositoryInterface;
use App\Contracts\RevenusRepositoryInterface;
use App\Repositories\DepenseRepository;
use App\Repositories\EpargnesRepository;
use App\Repositories\RevenusRepository;
use Illuminate\Support\ServiceProvider;

class RepositoriesServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->bind(RevenusRepositoryInterface::class, RevenusRepository::class);
        $this->app->bind(DepenseRepositoryInterface::class, DepenseRepository::class);
        $this->app->bind(EpargneRepositoryInterface::class, EpargnesRepository::class);
    }
}
