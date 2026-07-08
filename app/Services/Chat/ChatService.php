<?php

namespace App\Services\Chat;

use App\Models\User;
use App\Prompts\AssistantFinancierPrompt;
use App\Services\IA\OpenAIService;

class ChatService
{

    public function __construct(
        protected OpenAIService $openAI,
        protected UserFinancialContext $userFinancialContext
    ) {}

    public function ask(User $user, string $message): string
    {
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
            [
                "role" => "user",
                "content" => $message
            ]
        ];

        return $this->openAI->chat($messages);
    }
}
