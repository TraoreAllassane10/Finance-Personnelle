<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConfigurationController extends Controller
{
    public function index()
    {
        // N'oublie pas de d'ajouter le user_id a la configuration car chaque user à sa configuration à part
        // et aussi apres chaque ajout d'un nouveau user , on doit creer sa coonfig de base

        return Inertia::render('Parametres');
    }

    public function user(Request $request, User $user)
    {
        if ($user->id === Auth::id()) {
            $validated = $request->validate([
                'name' => 'required',
                'email' => 'required',
            ]);

            $user->name = $validated['name'];
            $user->email = $validated['email'];
            $user->password = empty($request->password) ? $user->password : $request->password;

            $user->save();

            Auth::guard('web')->logout();

            $request->session()->invalidate();

            $request->session()->regenerateToken();

            return redirect('/');
        }
    }
}
