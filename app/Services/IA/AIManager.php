<?php

namespace App\Services\IA;

use App\Services\IA\Contracts\AIProvider;
use App\Services\IA\Providers\OpenAIProvider;
use RuntimeException;

class AIManager
{
    // Quel Provider utilisé en fonction du founisseur defini dans services donc dans .env
    public function provider(): AIProvider
    {
        return match (config("services.ai.provider")) {
            "openai" => app(OpenAIProvider::class),
            default => throw new RuntimeException("Fournisseur IA inconnu")
        };
    }
}
