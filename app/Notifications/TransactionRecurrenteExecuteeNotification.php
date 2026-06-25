<?php

namespace App\Notifications;

use App\Enums\TypeNotificationEnum;
use App\Enums\TypeTransaction;
use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TransactionRecurrenteExecuteeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        protected Transaction $transaction
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
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
            "type" => TypeNotificationEnum::TRANSACTION_RECURRENTE_EXECUTEE->value,
            "transaction_id" => $this->transaction->id,
            "category_name" => $this->transaction->category->nom,
            "url" => $this->transaction->type === TypeTransaction::REVENU->value ? "/revenus" : "/depenses",
            "message" => "La transaction recurrente executée avec succès.",
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            "type" => TypeNotificationEnum::TRANSACTION_RECURRENTE_EXECUTEE->value,
            "transaction_id" => $this->transaction->id,
            "category_name" => $this->transaction->category->nom,
            "url" => $this->transaction->type === TypeTransaction::REVENU->value ? "/revenus" : "/depenses",
            "message" => "La transaction recurrente executée avec succès.",
        ]);
    }
}
