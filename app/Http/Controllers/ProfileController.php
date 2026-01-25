<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProfileRequest;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class ProfileController extends Controller
{
    public function show(User $user){
        $authUser = auth()->user();
        $quizzes =  $authUser != null && $authUser->id === $user->id ? $user->Quizzes()->limit(4)->orderByDesc('created_at','desc')->get() : $user->Quizzes()->where('isPublic',1)->limit(4)->orderByDesc('created_at','desc')->get();
        $likedQuizzes = $authUser != null && $authUser->id === $user->id ? $user->LikedQuizzes()->limit(4)->orderByDesc('created_at','desc')->get() : $user->LikedQuizzes()->where('isPublic',1)->limit(4)->orderByDesc('created_at','desc')->get();
    
        return Inertia::render("user/Profile",[
            "user" => [
                'id' => $user -> id,
                'name' => $user -> name,
                'biography' => $user -> biography,
                'email' => $user -> email,
                'image' => $user -> image,
                'quizzes' => $quizzes,
                'quizzes_count' => $authUser != null && $authUser->id === $user->id ? $user->Quizzes()->count() : $user->Quizzes()->where('isPublic',1)->count(),
                'liked_quizzes' =>  $likedQuizzes,
                'liked_quizzes_count' => $authUser != null && $authUser->id === $user->id ? $user->LikedQuizzes()->count() : $user->LikedQuizzes()->where('isPublic',1)->count(),
                'created_at' => Carbon::parse($user['created_at']) -> format('d/y/Y')
            ]
        ]);
    }

    public function edit(User $user){
        $authUser = auth()->user();

        //Comprobar que el perfil sea el del usuario y no de otro
        if($authUser->id != $user->id){
            return redirect("/");
        }

        return Inertia::render("user/EditProfile",[
            "user" => $user
        ]);
    }

    public function update(User $user, StoreProfileRequest $request){
        $authUser = auth()->user();

        //Comprobar que el perfil sea el del usuario y no de otro
        if($authUser->id != $user->id){
            return redirect("/");
        }

        //Validar quiz
        $data = $request -> validated();

        if($request->filled("image")){            
            //Verificar solo si es una imagen difernte a la que ya tiene
            if($data["image"]!== $user -> image){     
                //ver si el usuario ya tenia una imagen
                if ($user -> image) {
                    //Verificar que la imagen exista y eliminarla
                    if(File::exists("uploads/".$user -> image)){
                        File::delete("uploads/".$user -> image);
                    }   
                }
                $imageName = $this->saveImage($data["image"]);
                if(!$imageName){
                    return back() ->with('error', 'Ocurrio un error al subir la imagen.');
                }
            }
        }

        //Actualizar usuario
        $user["name"] = $request["name"];
        $user["biography"] = $request["biography"];
        
        if($request -> filled("image")){
            $user["image"] = $data["image"] !== $user->image ? $imageName : $user->image;
        }

        $user -> save();

        //Guardar preguntas y respuestas
        return redirect() -> route("profile.edit",$user -> name) ->with('success', 'Usuario actualizado correctamente');
    }   

    public function quizzes(User $user){
        $authUser = auth()->user();
        return Inertia::render("user/Quizzes",[
            "user" => $user,
            "results" => $authUser != null && $authUser->id === $user->id ? $user -> Quizzes()->paginate(20) : $user -> Quizzes()->where('isPublic',1)->paginate(20)
        ]);
    }

    public function likes(User $user){
        $authUser = auth()->user();
        return Inertia::render("user/Likes",[
            "user" => $user,
            "results" => $authUser != null && $authUser->id === $user->id ? $user -> LikedQuizzes()->paginate(20) : $user -> LikedQuizzes()->where('isPublic',1)->paginate(20)
        ]);
    }

    public function saveImage($image){
         // Extraemos el contenido base64 del Data URL
        $base64Image = preg_replace('/^data:image\/\w+;base64,/', '', $image);
        $imageData = base64_decode($base64Image);

        if(!$imageData){
            return false;
        }

        //Generamos un nombre único para el archivo
        $fileName = uniqid() . '.png';

        //Ruta de destino absoluta
        $path = public_path('uploads/' . $fileName);

        //Intentamos guardar la imagen directamente
        $escrito = file_put_contents($path, $imageData);

        if(!$escrito){
            return false;
        }

        return $fileName;
    }
}
