<?php

namespace App\Services\IA;

use App\Services\IA\contracts\AIProviderInterface;
use OpenAI\Laravel\Facades\OpenAI;

class OpenAIService implements AIProviderInterface
{
    public function chat(array $messages): string
    {
        $response = OpenAI::chat()->create([
            "model" => 'gpt-4.1-mini',
            "messages" => $messages
        ]);

        return $response->choices[0]->message->content;
    }
}
