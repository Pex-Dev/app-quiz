<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuizRequest;
use App\Models\CompletedQuizzes;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\QuizLike;
use App\Models\QuizQuestion;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index(Request $request){
        $order = $request->get('order','new');
        $category = $request->get('category');
        $search = $request -> get('search');

        $user = auth()->user();
        
        $query = Quiz::with('Likes')->withCount("Questions");
        if($user){
                $query ->withExists(['Completers as completed'=> fn($q) => $q -> where('user_id',$user['id'])]);
        }        
        if($search){
            $query -> where('name','LIKE','%'.$search.'%');
        }
        if($category){
            $query -> where('category_id',$category);
        }

        switch ($order) {
            case 'new':
                $query->orderBy('created_at','desc');
            break;
            case 'old':
                $query -> orderBy('created_at','asc');
            break;
            case 'like':
                $query -> withCount(['likes as likes_count' => function (Builder $query) {
                    $query->where('like', 1);
                }]);
                $query -> orderByDesc('likes_count','desc');
            break;
            case 'dislike':
                $query -> withCount(['likes as dislikes_count' => function (Builder $query) {
                    $query->where('like', 0);
                }]);
                $query -> orderBy('dislikes_count','desc');
            break;
            
            default:
                $query -> orderBy('created_at','desc');
                break;
        }

        $results = $query -> paginate(20);

        return Inertia::render('quiz/Index',[
            'results' => $results
        ]);
    }

    public function show(Quiz $quiz){
        $quiz->load(['user', 'questions.answers'])->loadCount([
            'likes as likes_count' => function ($query){
                $query -> where('like',1);
            },
            'likes as dislikes_count' => function ($query){
                $query -> where('like',0);
            }
        ]);

        $like = null;

        //Obtener el ususario
        $user = auth() -> user();

        //Obtener valoración
        if($user){
            $quizLike = QuizLike::where('quiz_id',$quiz -> id) -> where('user_id',$user -> id)->first();
            if($quizLike){
                $like = $quizLike -> like;
            }
        }

        //Añadír valoración
        $quiz -> user_valoration = $like;

        return Inertia::render('quiz/Play',[
            "quiz" => $quiz,
            "created_at" => $quiz ? $quiz->created_at->diffForHumans() : null
        ]);
    }

    public function create(Request $request){
        return Inertia::render('quiz/Create');
    }

    public function store(StoreQuizRequest $request){
        $data = $request -> validated();
        
        if($request->filled("image")){
            $imageName = $this->saveImage($data["image"]);
            if(!$imageName){
                return back() ->with('error', 'Ocurrio un error al subir la imagen.');
            }
        }
        

        //Guardar quiz
        $quiz = Quiz::create([
            "user_id" => Auth::id(),
            "name" => $data["name"],
            "description" => $data["description"],
            "isPublic" => $data["public"],
            "category_id" => $data["category"],
            "image" => $request->filled("image") ? $imageName : null
        ]);

        //Guardar preguntas y respuestas
        $this->saveQuestions($data["questions"],$quiz -> id);

        return back() ->with('success', 'Quiz creado correctamente');
    }

    public function edit($id){
        $user =  auth() -> user();
        $quiz = Quiz::with(["Category","Questions.Answers"]) -> find($id);

        if($quiz){
            if($quiz["user_id"] != $user["id"]){
                return redirect("/");
            }
        }

        return Inertia::render("quiz/Update",[
            "quiz" => $quiz
        ]);
    }

    public function update(StoreQuizRequest $request, Quiz $quiz){
        $user =  auth() -> user();
  
        if($quiz["user_id"] != $user["id"])return redirect("/");
        
        //Validar quiz
        $data = $request -> validated();
        
        if($request->filled("image")){            
            //Verificar solo si es una imagen difernte a la que ya tiene
            if($data["image"]!== $quiz["image"]){     
                //ver si el quiz ya tenia una imagen
                if ($quiz["image"]) {
                    //Verificar que la imagen exista y eliminarla
                    if(File::exists("uploads/".$quiz["image"])){
                        File::delete("uploads/".$quiz["image"]);
                    }   
                }
                $imageName = $this->saveImage($data["image"]);
                if(!$imageName){
                    return back() ->with('error', 'Ocurrio un error al subir la imagen.');
                }
            }
        }

        //Actualizar quiz
        $quiz["name"] = $request["name"];
        $quiz["description"] = $request["description"];
        $quiz["isPublic"] = $request["public"];
        $quiz["category_id"] = $request["category"];
        
        if($request -> filled("image")){
            $quiz["image"] = $data["image"] !== $quiz->image ? $imageName : $quiz->image;
        }

        $quiz -> save();

        //Eliminar todas las preguntas
        $quiz -> Questions() -> delete();

        //Guardar preguntas y respuestas
        $this->saveQuestions($data["questions"],$quiz -> id);
        return back() ->with('success', 'Quiz actualizado correctamente');
    }

    public function setCompleted(Quiz $quiz){
        $user = auth()->user();

        //Ver si esta completado
        $completed = $user -> CompletedQuizzes() -> where('quiz_id',$quiz['id'])->exists();
        if($completed)return;

        CompletedQuizzes::create([
            'user_id' => $user['id'],
            'quiz_id' =>  $quiz['id']
        ]);
    }

    public function setLike(Quiz $quiz, Request $request){
        $user = auth()->user();
    
        //Ver si ya le dio like o dislike
        $like = $request['like'];
        $quizLike = QuizLike::where('quiz_id',$quiz['id'])->where('user_id',$user['id']) ->first();

        //Resultado final de la valoración del usuario (like o dislike)
        $result = null;

        //Si ya se habia dado like o dislike actualizar
        if($quizLike){
            if($quizLike['like'] == $like){
                $quizLike -> delete();
            }else{
                $quizLike['like'] = $like;
                $quizLike -> save();
                $result = $like;
            }
            return response() -> json([
                'message' => 'actualizado',
                'success' => true,
                'result' => $result
            ]);
        }else{
            QuizLike::create([
                'quiz_id' => $quiz['id'],
                'user_id' => $user['id'],
                'like' => $like
            ]);

            $result = $like;

            return response() -> json([
                'message' => 'agregado',
                'success' => true,
                'result' => $result
            ]);
        }
    }

        public function saveQuestions($questions, $quizId){
     
        foreach ($questions as $q) {
            $question =  QuizQuestion::create([
                "quiz_id" => $quizId,
                "question_text" => $q["question_text"],
                "order" => $q["order"]
            ]);
            foreach ($q["answers"] as $a) {
                QuizAnswer::create([
                    "quiz_question_id" => $question["id"],
                    "answer_text" => $a["answer_text"],
                    "is_correct" => $a["is_correct"]
                ]);
            }
        }
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
