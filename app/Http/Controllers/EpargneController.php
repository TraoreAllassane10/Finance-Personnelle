<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Epargne;
use App\Services\Excel\ExcelEpargne;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use App\Http\Requests\EpargneRequest;
use App\Services\EpargneServices;

class EpargneController extends Controller
{
    protected $epargneService;

    public function __construct(EpargneServices $epargneService)
    {
        $this->epargneService = $epargneService;
    }

    public function index()
    {
        $epargneService = $this->epargneService->all();

        return Inertia::render('Epargnes/Epargnes', [
            'epargnes' => $epargneService[0],
            'totalEpargne' => $epargneService[1]
        ]);
    }

    public function store(EpargneRequest $request)
    {
        $this->epargneService->create($request);

        return redirect()->back()->with("success", 'Une epargne ajoutée');
    }

    public function edit(Epargne $epargne)
    {
        return Inertia::render('Epargnes/Edit', [
            "epargne" => $epargne
        ]);
    }

    public function update(EpargneRequest $request, Epargne $epargne)
    {
        $this->epargneService->update($epargne, $request);

        return redirect()->route('epargnes');
    }

    public function destroy(Epargne $epargne)
    {
        $this->epargneService->delete($epargne->id);
        return redirect()->back()->with('success', "Epargne supprimé");
    }

    public function excel()
    {
        $epargnes = Epargne::where('user_id', Auth::id())->get();
        $spreadsheet = new Spreadsheet();

        return (new ExcelEpargne($spreadsheet))->download($epargnes, "Epargnes");
    }
}
