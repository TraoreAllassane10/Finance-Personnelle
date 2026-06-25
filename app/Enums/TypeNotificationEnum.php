<?php

namespace App\Enums;

enum TypeNotificationEnum: string
{
    case BUDGET_DEPASSE = "Budget_depasse";
    case TRANSACTION_RECURRENTE_EXECUTEE = "Transaction_recurrente_executee";
}
