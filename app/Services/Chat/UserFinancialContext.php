<?php

namespace App\Services\Chat;

use App\Models\User;
use App\Services\TransactionService;

/**
 * Construire le context financier
 */

class UserFinancialContext
{

    public function __construct(
        protected TransactionService $transactionService
    ) {}

    public function build(User $user): string
    {
        $totalRevenu = $this->transactionService->getMontantTotalRevenu("mois");
        $totalDepense = $this->transactionService->getMontantTotalDepense("mois");

        return <<<TEXT

Utilisateur : {$user->name}

Devise : FCFA

Revenu mensuel : {$totalRevenu}

Dépenses du mois : {$totalDepense}

TEXT;
    }
}
