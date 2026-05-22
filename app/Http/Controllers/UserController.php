<?php

namespace App\Http\Controllers;

use App\Http\Requests\user\UpdateInfoUserRequest;
use App\Models\User;
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

    public function deleteAccount()
    {
        try {
            $userAuth = Auth::user();

            $user = User::find($userAuth->id);

            Log::info($user);

            $userDelete = $user->delete();

            if ($userDelete) {
                return response()->json(['success' => true, 'message' => 'Profil mise à jour']);
            } else {
                return response()->json(['success' => false, 'message' => 'La suppression du compte à echouer']);
            }
        } catch (Exception $e) {
            Log::error('Erreur survenu lors de la suppression du compte utilisateur', ['erreur' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur survenu lors de la suppression du compte utilisateur']);
        }
    }
}
