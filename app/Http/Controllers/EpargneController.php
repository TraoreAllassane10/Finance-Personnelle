<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Epargne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class EpargneController extends Controller
{
    public function index()
    {
        $epargnes = Epargne::where('user_id', Auth::id())->get();

        return Inertia::render('Epargnes/Epargnes', [
            'epargnes' => $epargnes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => "required",
            'montant' => 'required',
            'compte' => 'required',
            'projet' => 'required'
        ]);

        $epargnes = new Epargne();

        $epargnes->date = $validated['date'];
        $epargnes->montant = $validated['montant'];
        $epargnes->compte = $validated['compte'];
        $epargnes->projets = $validated['projet'];
        $epargnes->user_id = Auth::id();

        $epargnes->save();

        return redirect()->back()->with("success", 'Une epargne ajoutée');
    }

    public function edit(Epargne $epargne)
    {
        return Inertia::render('Epargnes/Edit', [
            "epargne" => $epargne
        ]);
    }

    public function update(Request $request, Epargne $epargne)
    {
        $validated = $request->validate([
            'date' => "required",
            'montant' => 'required',
            'compte' => 'required',
            'projet' => 'required'
        ]);

        if ($epargne && $epargne->user_id == Auth::id()) {
            $epargne->date = $validated['date'];
            $epargne->montant = $validated['montant'];
            $epargne->compte = $validated['compte'];
            $epargne->projets = $validated['projet'];

            $epargne->save();

            return redirect()->route('epargnes');
        }
    }

    public function destroy(Epargne $epargne)
    {
        if ($epargne) {
            $epargne->delete();
            return redirect()->back()->with('success', "Epargne supprimé");
        }
    }

    public function excel()
    {
        $epargnes = Epargne::all();

        //Creer un objet Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        //Ajouter les en-têtes des colonnes
        $coloumns = ["ID", "Montant", "Compte d'epargne", "Date", "Projet"];
        $sheet->fromArray($coloumns, NULL, 'A1');

        //Ajouter les données des epargnes
        $rowNumber = 2; // Commence par les en-têtes
        foreach ($epargnes as $epargne) {
            $sheet->setCellValue("A$rowNumber", $epargne->id);
            $sheet->setCellValue("B$rowNumber", $epargne->montant);
            $sheet->setCellValue("C$rowNumber", $epargne->compte);
            $sheet->setCellValue("D$rowNumber", $epargne->date);
            $sheet->setCellValue("E$rowNumber", $epargne->projets);

            $rowNumber++;
        }

          //Creer le nom du fichier
          $filename = "Epargnes_". now()->format('Y-m-d_H:i'). '.xlsx';

          //Ajouter les en-têtes pour le telechargement
          $headers = [
              "Content-Type" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "Content-Disposition" => "attachment; filename={$filename}",
              "Cache-Control" => "max-age=0",
          ];

          //Créer l'ecrivain Excel
          $writer = new Xlsx($spreadsheet);

          //Retourner le fichier en reponse
          return response()->stream(
              function() use ($writer){
                  $writer->save('php://output');
              },
              200,
              $headers
          );
    }
}
