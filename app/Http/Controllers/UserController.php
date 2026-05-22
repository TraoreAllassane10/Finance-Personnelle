<?php

namespace App\Http\Controllers;

use App\Http\Requests\user\UpdateInfoUserRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function updateNameAndEmail(UpdateInfoUserRequest $request)
    {
        try {
            $data = $request->validated();

            $user = Auth::user();

            $user->name = $data['name'];
            $user->email = $data['email'];

            $user->save();


            return response()->json(['success' => true, 'message' => 'Profil mise à jour']);
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la modification des informations de user', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la mise à jour des informations']);
        }
    }
}
