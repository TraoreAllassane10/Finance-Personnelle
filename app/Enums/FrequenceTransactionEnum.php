<?php

namespace App\Enums;

enum FrequenceTransactionEnum: string
{
    case QUOTIDIENNE = "Quotidienne";
    case HEBDOMADAIRE = "Hebdomadaire";
    case MENSUELLE = "Mensuelle";
    case ANNUELLE = "Annuelle";
    case INDEFINIE = "Indefinie";
}
