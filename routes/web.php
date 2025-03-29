<?php

use App\Http\Controllers\DepenseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RevenusController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
