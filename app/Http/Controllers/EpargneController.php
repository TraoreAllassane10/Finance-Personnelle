<?php

namespace App\Http\Controllers;

use App\Contracts\EpargneRepositoryInterface;
use App\Models\Depense;
use Inertia\Inertia;
use App\Models\Epargne;
use App\Services\Excel\Excel;
use App\Services\Excel\ExcelEpargne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpParser\Node\Stmt\Return_;

class EpargneController extends Controller
{
    private $epargneRepository;

    public function __construct(EpargneRepositoryInterface $epargneRepository)
    {
        $this->epargneRepository = $epargneRepository;
    }

    public function index()
    {
        $epargnes = $this->epargneRepository->allForUser(Auth::id());

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

        $this->epargneRepository->create($validated);

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

            $this->epargneRepository->update($epargne->id, $validated);
            return redirect()->route('epargnes');
        }
    }

    public function destroy(Epargne $epargne)
    {
        $this->epargneRepository->delete($epargne->id);
        return redirect()->back()->with('success', "Epargne supprimé");
    }

    public function excel()
    {
        $epargnes = Epargne::all();
        $spreadsheet = new Spreadsheet();

        return (new ExcelEpargne($spreadsheet))->download($epargnes, "Epargnes");
    }
}
