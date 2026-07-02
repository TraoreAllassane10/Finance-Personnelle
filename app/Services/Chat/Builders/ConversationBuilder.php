<?php

namespace App\Services\Chat\Builders;

/**
 * Quel message dois-je envoyé à l'IA
 */

class ConversationBuilder
{
    protected array $messages = [];

    public function addSystem(string $content)
    {
        $this->messages[] = [
            "role" => "system",
            "content" => $content
        ];

        return $this;

        // $this, pour qu'on puisse faire $builder->addSystem(...)->addUser(...)->addAssistant()                       
    }

    public function addUser(string $content)
    {
        $this->messages[] = [
            "role" => "user",
            "content" => $content
        ];

        return $this;
    }

    public function addAssistant(string $content)
    {
        $this->messages[] = [
            "role" => "assistant",
            "content" => $content
        ];

        return $this;
    }

    public function build(): array
    {
        return $this->messages;
    }
}
