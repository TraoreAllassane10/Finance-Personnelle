<?php

namespace App\Services\IA;

use App\Services\IA\contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Override;

class GeminiService implements AIProviderInterface
{
    #[Override]
    public function chat(array $messages)
    {
        $apiKey = config('services.gemini.api_key');

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $contents = [];

        // Recupere le prompt systeme
        $systemPrompt = array_shift($messages);

        foreach ($messages as $index => $message) {

            $text = $message['content'];

            if ($index === 0 && $systemPrompt) {
                $text = $systemPrompt['content'] . "\n\n" . $text;
            }

            $contents[] = [
                "role" => $message['role'] === 'assistant' ? 'model' : 'user',
                "parts" => [
                    [
                        "text" => $text
                    ]
                ]
            ];
        }

        $response = Http::withQueryParameters([
            'key' => $apiKey,
        ])->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            [
                'contents' => $contents,
            ]
        );

        if ($response->failed()) {
            // throw new Exception($response->body());
            Log::info('Erreur loors de la generation de reponse', [$response->status(), $response->json(), $response->body()]);

            return;
        }

        return data_get($response->json(), 'candidates.0.content.parts.0.text');
    }
}
