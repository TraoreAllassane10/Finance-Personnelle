<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Chat\ChatService;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    public function __invoke(Request $request, ChatService $chatService)
    {
        $request->validate([
            'message' => ['required', 'string'],
        ]);

        $response = $chatService->ask($request->user(), $request->message);

        return response()->json([
            'message' => $response,
        ]);
    }
}
