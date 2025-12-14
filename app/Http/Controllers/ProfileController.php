<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(User $user){
        return Inertia::render("user/Profile",[
            "user" => [
                'name' => $user['name'],
                'email' => $user['email'],
                'image' => $user['image'],
                'created_at' => Carbon::parse($user['created_at']) -> format('d/y/Y')
            ]
        ]);
    }
}
