<?php

namespace App\Notifications;

use App\Enums\TypeNotificationEnum;
use App\Models\Budget;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BudgetDepasseNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected Budget $budget;
    public function __construct(Budget $budget)
    {
        $this->budget = $budget;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            "type" => "Budget_depasse",
            "budget_id" => $this->budget->id,
            "category_name" => $this->budget->category->nom,
            "url" => "/budgets",
            "message" => "Vous avez depassé le budget de {$this->budget->category->nom}.",
        ];
    }
}
