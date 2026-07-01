<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    public function __invoke(Request $request)
    {
        $request->validate([
            'message' => ['required', 'string'],
        ]);

        return response()->json([
            'message' => "J'ai bien reçu votre message : " . $request->message,
        ]);
    }
}
