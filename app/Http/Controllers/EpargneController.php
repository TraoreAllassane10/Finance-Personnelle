<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Depense;
use App\Models\Epargne;
use Illuminate\Http\Request;
use App\Services\Excel\Excel;
use PhpParser\Node\Stmt\Return_;
use App\Services\Excel\ExcelEpargne;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use App\Contracts\EpargneRepositoryInterface;

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

        //Calcule le total des epargnes de ce mois
        $totalEpargne = $epargnes->map(function ($epargne) {
            return Carbon::parse($epargne['date'])->month == now()->month ? $epargne : null;
        })->sum('montant');

        return Inertia::render('Epargnes/Epargnes', [
            'epargnes' => $epargnes,
            'totalEpargne' => $totalEpargne
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
        $epargnes = Epargne::where('user_id', Auth::id())->get();
        $spreadsheet = new Spreadsheet();

        return (new ExcelEpargne($spreadsheet))->download($epargnes, "Epargnes");
    }
}
