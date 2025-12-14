<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index(Request $request){
        return Inertia::render('auth/Login');
    }

    public function store(Request $request){
        if(Auth::attempt([
            'email' => $request['email'],
            'password' => $request['password']
        ])){
            return redirect('/');
        }else{
            return back() -> withErrors(['email' => 'email o contraseña incorrectas']);
        }
    }

    public function destroy(Request $request){
        Auth::logout();
        $request -> session() -> invalidate();
        $request -> session() -> regenerateToken();
        return redirect('/');
    }
}
