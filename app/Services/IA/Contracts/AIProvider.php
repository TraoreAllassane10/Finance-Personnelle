<?php

namespace App\Services\IA\Contracts;

interface AIProvider
{
    // Toutes les classes Provider doivent implementer cette methode
    public function send(array $messages): string;
}
