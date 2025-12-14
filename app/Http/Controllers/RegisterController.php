<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index(Request $request){
        return Inertia::render('auth/Register');
    }

    public function store(Request $request){
        //validar
        $request -> validate([
            'name' => 'required|min:3|max:15|unique:users',
            'email' => 'required|min:5|max:30|email|unique:users',
            'password' => 'required|min:5|max:15|confirmed'
        ]);

        //registrar usuario

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => $request['password']
        ]);
        
        Auth::login($user);

        $user->sendEmailVerificationNotification();
        
        return redirect() -> route('verification.notice');
    }

    public function notice(Request $request) {
        return Inertia::render('register/Notice');
    }

    public function send(Request $request){
        if ($request->user()->hasVerifiedEmail()) {
            return back()->withErrors([
                'email' => 'Tu email ya está verificado.'
            ]);
        }

        try {
            $request->user()->sendEmailVerificationNotification();
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'No se pudo enviar el correo de verificación. Intenta nuevamente más tarde.'
            ]);
        }

        return back()->with('success', 'Enlace de verificación enviado correctamente');
    }

    public function verify($id, $hash){
        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403);
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        return Inertia::render('register/Verify');
    }
}
