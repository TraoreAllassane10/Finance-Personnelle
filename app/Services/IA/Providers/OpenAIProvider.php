<?php 

namespace App\Services\IA\Providers;

use App\Services\IA\Contracts\AIProvider;

class OpenAIProvider implements AIProvider
{
    public function send(array $messages): string {
        return "Reponse simulé d'open AI";
    }
}