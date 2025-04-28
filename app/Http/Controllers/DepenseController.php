<?php

namespace App\Http\Controllers;

use App\Contracts\DepenseRepositoryInterface;
use Inertia\Inertia;
use App\Models\Depense;
use App\Models\Category;
use App\Services\Chart\GroupByDate;
use App\Services\Excel\Excel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

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

        $depensesParDate = (new GroupByDate())->group($depenses);

        return Inertia::render('Depenses/Depense', [
            "depenses" => $depenses,
            "categories" => $categories,
            "depensesChart" => $depensesParDate
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
        $depenses = Depense::all();
        $spreadsheet = new Spreadsheet();

        return (new Excel($spreadsheet))->download($depenses, "depenses");
    }
}
