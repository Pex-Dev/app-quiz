<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function Index(Request $request){
        $user = auth() -> user();
        
        $query = Quiz::withCount("Questions");
        if($user){
                $query ->withExists(['Completers as completed'=> fn($q) => $q -> where('user_id',$user['id'])]);
        }

        $quizzes = $query -> orderBy('created_at','desc') -> limit(16) -> get();
 
        return Inertia::render('index',[
                "quizzes" => $quizzes
        ]);
    }
}
