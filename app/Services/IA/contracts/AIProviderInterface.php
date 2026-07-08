<?php

namespace App\Services\IA\contracts;

interface AIProviderInterface
{
    public function chat(array $messages);
}