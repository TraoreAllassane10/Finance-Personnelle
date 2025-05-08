<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConfigurationController extends Controller
{
    public function index()
    {
        $configuration = Configuration::where('user_id', Auth::id())->get();
        return Inertia::render('Parametres', [
            'configuration' => $configuration
        ]);
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

    public function updateConfig(Request $request)
    {
        $configuration = Configuration::where('user_id', Auth::id());

        $configuration->devise = $request->devise;
        $configuration->theme = $request->theme;
        $configuration->langue = $request->langue;

        $configuration->save();

        return redirect()->back();
    }
}
