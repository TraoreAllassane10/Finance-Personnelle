<?php

namespace App\Services\Chat;

use App\Models\User;
use App\Prompts\AssistantFinancierPrompt;
use App\Services\IA\GeminiService;
use Illuminate\Support\Facades\Log;
use OpenAI\Exceptions\RateLimitException;

class ChatService
{

    public function __construct(
        protected GeminiService $geminiService,
        protected UserFinancialContext $userFinancialContext
    ) {}

    public function ask(User $user, string $message): string
    {
        try {
            // REcuperation des anciens messages
            $history = $user->messages()->latest()
                ->take(20)
                ->get()
                ->reverse()
                ->map(fn($message) => [
                    "role" => $message->role,
                    "content" => $message->content
                ])
                ->values()
                ->toArray();

            // Recuperation du context constitue des données de l'utilisateur connectés
            $context = $this->userFinancialContext->build($user);

            $messages = [
                [
                    "role" => "system",
                    "content" => AssistantFinancierPrompt::content()
                ],
                [
                    "role" => "system",
                    "content" => $context
                ],
                ...$history,
                [
                    "role" => "user",
                    "content" => $message
                ]
            ];

            // Enregistrement du message de l'utilisateur
            $user->messages()->create([
                'role' => 'user',
                'content' => $message
            ]);

            // Repoonse de IA
            $response = $this->geminiService->chat($messages);

            // Enregistrement de la reponse au message de l'utilisateur
            $user->messages()->create([
                'role' => 'assistant',
                'content' => $response
            ]);

            return $response;
        } catch (RateLimitException $e) {
            Log::info('Le service d\'IA est momentanément indisponible (quota API atteint).', ["error" => $e->getMessage()]);
            return "Le service d'IA est momentanément indisponible (quota API atteint).";
        }
    }
}
