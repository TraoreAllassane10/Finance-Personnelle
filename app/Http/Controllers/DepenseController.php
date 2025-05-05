<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Depense;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\Excel\Excel;
use App\Services\Chart\GroupByDate;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use App\Contracts\DepenseRepositoryInterface;

class DepenseController extends Controller
{
    private $depenseRepository;

    public function __construct(DepenseRepositoryInterface $depenseRepository)
    {
        $this->depenseRepository = $depenseRepository;
    }

    public function index()
    {
        $categories = Category::all();

        $depenses = $this->depenseRepository->allForUser(Auth::id());

        //Calcule le total des depenses de ce mois
        $totalDepense = $depenses->map(function($depense) {
            return Carbon::parse($depense['date'])->month == now()->month ? $depense : null;
        })->sum('montant');


        $depensesParDate = (new GroupByDate())->group($depenses);

        return Inertia::render('Depenses/Depense', [
            "depenses" => $depenses,
            "categories" => $categories,
            "depensesChart" => $depensesParDate,
            "totalDepense" => $totalDepense
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ]);

        $this->depenseRepository->create($validated);

        return redirect()->back()->with('success', 'Un revenus ajouté');
    }

    public function edit(Depense $depense)
    {
        return Inertia::render('Depenses/Edit', ["depense" => $depense, "categories" => Category::all()]);
    }

    public function update(Request $request, Depense $depense)
    {
        $validated = $request->validate([
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ]);

        if ($depense && $depense->user_id == Auth::id()) {

            $this->depenseRepository->update($depense->id, $validated);

            return redirect()->route("depenses");
        }
    }

    public function destroy(Depense $depense)
    {
        $this->depenseRepository->delete($depense->id);
        return redirect()->back()->with('success', "Revenu supprimé");
    }

    public function excel()
    {
        $depenses = Depense::where('user_id', Auth::id())->get();
        $spreadsheet = new Spreadsheet();

        return (new Excel($spreadsheet))->download($depenses, "depenses");
    }
}
