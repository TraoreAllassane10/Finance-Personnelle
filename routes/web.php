<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DepenseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RevenusController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EpargneController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/revenus/excel', [RevenusController::class, 'excel'])->name('revenus.excel');
Route::get('/depenses/excel', [DepenseController::class, 'excel'])->name('depenses.excel');
Route::get('/epargnes/excel', [EpargneController::class, 'excel'])->name('epargnes.excel');

Route::middleware('auth')->group(function () {

    Route::get('/revenus', [RevenusController::class, 'index'])->name('revenus');
    Route::post('/revenus', [RevenusController::class, 'store'])->name('revenus.store');
    Route::get('/revenus/{revenu}', [RevenusController::class, 'edit'])->name('revenus.edit');
    Route::put("/revenus/{revenu}", [RevenusController::class, 'update'])->name('revenus.update');
    Route::delete('/revenus/{revenu}', [RevenusController::class, 'destroy'])->name('revenus.delete');


    Route::get('/depenses', [DepenseController::class, 'index'])->name('depenses');
    Route::post('/depenses', [DepenseController::class, 'store'])->name('depenses.store');
    Route::get('/depenses/{depense}', [DepenseController::class, 'edit'])->name('depenses.edit');
    Route::put("/depenses/{depense}", [DepenseController::class, 'update'])->name('depenses.update');
    Route::delete('/depenses/{depense}', [DepenseController::class, 'destroy'])->name('depenses.delete');

    Route::get('/epargnes', [EpargneController::class, 'index'])->name('epargnes');
    Route::post('/epargnes', [EpargneController::class, 'store'])->name('epargnes.store');
    Route::get('/epargnes/{epargne}', [EpargneController::class, 'edit'])->name('epargnes.edit');
    Route::put("/epargnes/{epargne}", [EpargneController::class, 'update'])->name('epargnes.update');
    Route::delete('/epargnes/{epargne}', [EpargneController::class, 'destroy'])->name('epargnes.delete');

    Route::get("/parametres", [ConfigurationController::class, 'index'])->name('parametres');
    Route::put("parametres/{user}", [ConfigurationController::class, 'user'])->name('user.infos');

    Route::post('/categorie', [CategoryController::class, 'store'])->name('categorie.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
