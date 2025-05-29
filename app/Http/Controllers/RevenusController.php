<?php

namespace App\Http\Controllers;

use App\Http\Requests\RevenuRequest;
use App\Models\Category;
use App\Models\Revenus;
use App\Services\Excel\Excel;
use App\Services\RevenuServices;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class RevenusController extends Controller
{
    protected $revenuService;

    public function __construct(RevenuServices $revenuService)
    {
        $this->revenuService = $revenuService;
    }

    public function index()
    {

        $revenuService = $this->revenuService->all();

        return Inertia::render('Revenus/Revenus', [
            "revenus" => $revenuService[0],
            "revenusChart" => $revenuService[1],
            "categories" => $revenuService[2],
            "totalRevenus" => $revenuService[3]
        ]);
    }

    public function store(RevenuRequest $request)
    {

        $this->revenuService->create($request);

        return redirect()->back()->with('success', 'Un revenus ajouté');
    }

    public function edit(Revenus $revenu)
    {
        return Inertia::render('Revenus/Edit', ["revenu" => $revenu, "categories" => Category::all()]);
    }

    public function update(RevenuRequest $request, Revenus $revenu)
    {

        $this->revenuService->update($revenu, $request);

        return redirect()->route("revenus");
    }

    public function destroy(Revenus $revenu)
    {
        $this->revenuService->delete($revenu->id);

        return redirect()->back()->with('success', "Revenu supprimé");
    }

    public function excel()
    {
        $revenus = Revenus::where('user_id', Auth::id())->get();
        $spreadsheet = new Spreadsheet();

        return (new Excel($spreadsheet))->download($revenus, "Revenus");
    }
}
