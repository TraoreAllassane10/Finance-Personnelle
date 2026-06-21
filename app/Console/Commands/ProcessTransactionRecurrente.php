<?php

namespace App\Console\Commands;

use App\Models\Transaction;
use App\Models\TransactionRecurrente;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ProcessTransactionRecurrente extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-transaction-recurrente';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $transactionRecurrentes = TransactionRecurrente::where('active', 1)
            ->where("next_run_at", "<=", now())
            ->get();

        // Création d'une transaction pour chaque transaction recurrente trouvée
        foreach ($transactionRecurrentes as $recurrente) {
            Transaction::create([
                "type" => $recurrente->type,
                "date" => now(),
                "montant" => $recurrente->montant,
                "description" => $recurrente->description,
                "user_id" => $recurrente->user_id,
                "category_id" => $recurrente->category_id
            ]);

            // Definition de la prochaine date d'execution
            $nextDate = null;
            switch ($recurrente->frequence) {
                case "Quotidienne":
                    $nextDate = Carbon::parse($recurrente->next_run_at)->addDay();
                    break;

                case "Hebdomadaire":
                    $nextDate = Carbon::parse($recurrente->next_run_at)->addWeek();
                    break;

                case "Mensuelle":
                    $nextDate = Carbon::parse($recurrente->next_run_at)->addMonth();
                    break;

                case "Annuelle":
                    $nextDate = Carbon::parse($recurrente->next_run_at)->addYear();
                    break;
            }

            // Mise à jour de la prochaine date d'execution
            $recurrente->update(
                ["next_run_at" => $nextDate]
            );
        }
    }
}
