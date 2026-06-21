<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompteEpargneController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EpargneController;
use App\Http\Controllers\ObjectifEpargneController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionRecurrenteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VersementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [AuthenticatedSessionController::class, 'create']);

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::controller(TransactionController::class)->group(function () {
        Route::get('/revenus', 'revenus')->name('revenus');
        Route::get('/depenses', 'depenses')->name('depenses');
        Route::post('/transactions', 'store')->name('transactions.store');
        Route::get('/transactions/{transaction}', 'show')->name('transactions.show');
        Route::put('/transactions/{transaction}', 'update')->name('transactions.update');
        Route::delete('transactions/{transaction}', 'destroy')->name('transactions.destroy');
    });

    Route::get('/epargnes', [EpargneController::class, 'index'])->name('epargnes');

    Route::controller(BudgetController::class)->group(function () {
        Route::get('/budgets', 'index')->name('budgets');
        Route::post('/budgets', 'store')->name('budgets.store');
        Route::delete('/budgets/{budget}', 'destroy')->name('budgets.destroy');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories', 'index')->name('categories');
        Route::get('/categories/all', 'categories')->name('categories.all');
        Route::post('/categories/store', 'store')->name('categories.store');
    });

    // Routes Objectif Epargnes
    Route::controller(ObjectifEpargneController::class)->group(function () {
        Route::post('/objectifs-epargnes', 'store')->name('objectifs.store');
    });

    // Routes Comptes Epargnes
    Route::controller(CompteEpargneController::class)->group(function () {
        Route::post('/comptes-epargnes', 'store')->name('comptes.store');
    });

    // Routes Versements
    Route::controller(VersementController::class)->group(function () {
        Route::post('/versements', 'store')->name('versements.store');
    });

    // Routes Transactions Recurrentes
    Route::controller(TransactionRecurrenteController::class)->group(function () {
        Route::get('/transaction-recurrentes', 'index')->name('transaction.recurrente.index');
        Route::post('/transaction-recurrentes', 'store')->name('transaction.recurrente.store');
        Route::put('/transaction-recurrentes/{transaction}', 'update')->name('transaction.recurrente.update');
        Route::delete('/transaction-recurrentes/{transaction}', 'destroy')->name('transaction.recurrente.destroy');
        Route::get("/transaction-recurrentes/{transaction}/toogle-active", "toggleActive")->name("transaction.recurrente.toogle.active");
        });

    Route::get("/test", function () {
        return response()->json('Ceci est un test');
    });

    Route::get("/parametres", function () {
        return Inertia::render('Parametre/Index');
    })->name('parametres');

    Route::put('/user/profil', [UserController::class, 'updateNameAndEmail'])->name('user.profile.update');
    Route::put('/user/password', [UserController::class, 'updatePassword'])->name('user.password.update');
    Route::delete('/user/delete', [UserController::class, 'deleteAccount'])->name('user.deleteAccount');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
