<?php

namespace App\Http\Controllers;

use App\Contracts\RevenusRepositoryInterface;
use App\Models\Category;
use App\Models\Revenus;
use App\Services\Chart\GroupByDate;
use App\Services\Excel\Excel;
use App\Services\RevenuServices;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class RevenusController extends Controller
{
    protected $revenuRepository;

    public function __construct(RevenusRepositoryInterface $revenuRepository)
    {
        $this->revenuRepository = $revenuRepository;
    }

    public function index()
    {
        $revenuService = (new RevenuServices())->all();
        // dd();
        $categories = Category::all();

        // $revenus = $this->revenuRepository->allForUser(Auth::id());

        // //Calcule le total des revenus de ce mois
        // $totalRevenus = $revenus->map(function($revenu) {
        //     return Carbon::parse($revenu['date'])->month == now()->month ? $revenu : null;
        // })->sum('montant');

        // $revenusParDate = (new GroupByDate())->group($revenus);


        // return Inertia::render('Revenus/Revenus', [
        //     "revenus" => $revenus,
        //     "revenusChart" => $revenusParDate,
        //     "categories" => $categories,
        //     "totalRevenus" => $totalRevenus
        // ]);

        return Inertia::render('Revenus/Revenus', [
            "revenus" => $revenuService[0],
            "revenusChart" => $revenuService[1],
            "categories" => $revenuService[2],
            "totalRevenus" => $revenuService[3]
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

        $this->revenuRepository->create($validated);

        return redirect()->back()->with('success', 'Un revenus ajouté');
    }

    public function edit(Revenus $revenu)
    {
        return Inertia::render('Revenus/Edit', ["revenu" => $revenu, "categories" => Category::all()]);
    }

    public function update(Request $request, Revenus $revenu)
    {
        $validated = $request->validate([
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ]);

        if ($revenu && $revenu->user_id == Auth::id()) {

            $this->revenuRepository->update($revenu->id ,$validated);
            return redirect()->route("revenus");
        }
    }

    public function destroy(Revenus $revenu)
    {
        try
        {
            $this->revenuRepository->delete($revenu->id);
            return redirect()->back()->with('success', "Revenu supprimé");
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
    }

    public function excel()
    {
        $revenus = Revenus::where('user_id', Auth::id())->get();
        $spreadsheet = new Spreadsheet();

        return (new Excel($spreadsheet))->download($revenus, "Revenus");
    }
}
