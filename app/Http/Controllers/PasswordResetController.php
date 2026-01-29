<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class PasswordResetController extends Controller
{
    public function showLinkRequestForm(Request $request){
        return Inertia::render('auth/Forgot');
    }   

    public function sendResetLink(Request $request){
        $request -> validate([
            'email' => 'required|email'
        ]);

        //Enviar enlace de restablecimiento de contraseña
        $status = Password::sendResetLink(
            $request -> only('email')
        );

        //Comprobar si se pudo enviar el enlace
        return $status == Password::RESET_LINK_SENT ?
            back() -> with('success',__($status)) : back() -> withErrors(['error' => __($status)]);
    }

    public function showResetForm($token, Request $request){
        return Inertia::render('auth/Reset',[
            'email' => $request['email'],
            'token' => $token
        ]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token'    => 'required',
            'email'    => 'required|email|min:5|max:30',
            'password' => 'required|min:5|max:15|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
                ? back()->with('success', 'Enlace de verificación enviado correctamente')
                : back()->withErrors(['email' => [__($status)]]);
    }
}
