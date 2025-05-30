<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Depense;
use App\Models\Category;
use App\Services\Excel\Excel;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use App\Http\Requests\DepenseRequest;
use App\Services\DepenseServices;

class DepenseController extends Controller
{
    protected $depenseService;

    public function __construct(DepenseServices $depenseService)
    {
        $this->depenseService = $depenseService;
    }

    public function index()
    {
        $depenseService = $this->depenseService->all();

        return Inertia::render('Depenses/Depense', [
            "depenses" => $depenseService[0],
            "categories" => $depenseService[1],
            "depensesChart" => $depenseService[2],
            "totalDepense" => $depenseService[3]
        ]);
    }

    public function store(DepenseRequest $request)
    {

        $this->depenseService->create($request);

        return redirect()->back()->with('success', 'Un revenus ajouté');
    }

    public function edit(Depense $depense)
    {
        return Inertia::render('Depenses/Edit', ["depense" => $depense, "categories" => Category::all()]);
    }

    public function update(DepenseRequest $request, Depense $depense)
    {
        $this->depenseService->update($depense, $request);
        return redirect()->route("depenses");
    }

    public function destroy(Depense $depense)
    {
        $this->depenseService->delete($depense->id);
        return redirect()->back()->with('success', "Revenu supprimé");
    }

    public function excel()
    {
        $depenses = Depense::where('user_id', Auth::id())->get();
        $spreadsheet = new Spreadsheet();

        return (new Excel($spreadsheet))->download($depenses, "depenses");
    }
}
