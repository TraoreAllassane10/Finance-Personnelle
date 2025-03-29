<?php

namespace App\Providers;

use App\Repositories\Contracts\RevenusRepositoryInterface;
use App\Repositories\Eloquent\RevenusRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(RevenusRepositoryInterface::class, RevenusRepository::class);
    }

    public function boot()
    {
        //
    }
}
