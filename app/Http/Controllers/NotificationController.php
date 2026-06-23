<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $notificationNonLues = $user->unreadNotifications;
        return response()->json(["success" => true, "data" => $notificationNonLues]);
    }

    public function notificationMarkAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return response()->json(["success" => true, "message" => "Notifications marquées comme lue"]);
    }
}
