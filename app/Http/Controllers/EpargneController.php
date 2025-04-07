<?php

namespace App\Http\Controllers;

use App\Models\Epargne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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

        if($epargne && $epargne->user_id == Auth::id())
        {
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
        if($epargne)
        {
            $epargne->delete();
            return redirect()->back()->with('success', "Epargne supprimé");
        }
    }
}
