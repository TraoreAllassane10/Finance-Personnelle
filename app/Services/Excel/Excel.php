<?php

namespace App\Services\Excel;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Database\Eloquent\Collection;

class Excel
{
    protected $spreadsheet;

    public function __construct(Spreadsheet $spreadsheet)
    {
        $this->spreadsheet = $spreadsheet;
    }

    public function download(Collection $datas, string $nameFile)
    {
        $sheet = $this->spreadsheet->getActiveSheet();

        // Ajouter les en-têtes de colonnes
        $columns = ["ID", "Montant", "Catégorie", "Date", "Description"];
        $sheet->fromArray($columns, NULL, 'A1');

        //Ajouter les données des revenus
        $rowNumber = 2; // Commence par les en-têtes
        foreach ($datas as $data){
            $sheet->setCellValue("A$rowNumber", $data->id);
            $sheet->setCellValue("B$rowNumber", $data->montant);
            $sheet->setCellValue("C$rowNumber", $data->category->name);
            $sheet->setCellValue("D$rowNumber", $data->date);
            $sheet->setCellValue("E$rowNumber", $data->description);

            $rowNumber++;
        }

        // Créer le nom du fichier
        $filename = $nameFile."_". now()->format('Y-m-d_H:i'). '.xlsx';

        //Ajouter les en-têtes pour le téléchargement
        $headers = [
            "Content-Type" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition" => "attachment; filename={$filename}",
            "Cache-Control" => "max-age=0",
        ];

        // Créer l'ecrivain Excel
        $writer = new Xlsx($this->spreadsheet);

        //Retouner le fichier en reponse
        return response()->stream(
            function () use($writer){
                $writer->save('php://output');
            },
            200,
            $headers
        );
    }
}
