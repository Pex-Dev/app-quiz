<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

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
}
