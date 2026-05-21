<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\TransactionService;

class DashboardController extends Controller
{

    public function __construct(
        protected TransactionService $transactionService
    ) {}
    public function index()
    {

        $totalRevenu = $this->transactionService->getMontantTotalRevenu();
        $totalDepense = $this->transactionService->getMontantTotalDepense();

        return Inertia::render('Dashboard', [
            "totalRevenu" =>  $totalRevenu,
            "totalDepense" => $totalDepense,
            "soldeNet" => $totalRevenu - $totalDepense,
            "totalEpargne" => 0,
        ]);
    }
}
