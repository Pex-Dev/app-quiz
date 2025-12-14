<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index(Request $request){
 
        return Inertia::render('quiz/Create');
    }

    public function show($id){
        $quiz = Quiz::with("User","Questions.Answers") -> find($id);
       

        return Inertia::render('quiz/Play',[
            "quiz" => $quiz,
            "created_at" => $quiz ? $quiz->created_at->diffForHumans() : null
        ]);
    }

    public function create(Request $request){
        return Inertia::render('quiz/Create');
    }

    public function store(Request $request){
        //Validar campos del quiz
        $request -> validate([
            'name' => "min:10|max:30",
            'description' => "nullable|min:10|max:500",
            'category' => "numeric|min:1|max:12"
        ]);

        //Validar preguntas
        $questions = $request["questions"];
        $errors = $this->validateQuestions($request["questions"]);        

        $hayImagen = false;
        $imageName = "";

        if ($request["image"]) {
            $validarImagen = $this->validateImage($request["image"]);

            if (!$validarImagen["valid"]) {
                $errors[] = "image_error " . $validarImagen["message"];
            } else {
                $imagenGuardada = $this->saveImage($validarImagen['image_data']);
                if (!$imagenGuardada['stored']) {
                    $errors[] = "image_error No se pudo guardar la imagen";
                } else {
                    $hayImagen = true;
                    $imageName = $imagenGuardada["image_name"];
                }
            }
        }


        //Si hay errores retornar
        if(count($errors)>0){
            return back() -> withErrors(["questions" => implode("|",$errors)]);
        }

        //Si todo esta OK guardar

        //Guardar quiz
        $quiz = Quiz::create([
            "user_id" => Auth::id(),
            "name" => $request["name"],
            "description" => $request["description"],
            "isPublic" => $request["public"],
            "category_id" => $request["category"],
            "image" => $hayImagen ? $imageName : null
        ]);

        //Guardar preguntas y respuestas
        foreach ($questions as $q) {
            $question =  QuizQuestion::create([
                "quiz_id" => $quiz["id"],
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

    public function update(Request $request, $id){
        $user =  auth() -> user();
        $quiz = Quiz::find($id);
  
        if(!$quiz) return back() -> withErrors(["error" => "No existe el quiz"]);

        if($quiz["user_id"] != $user["id"])return back() -> withErrors(["error" => "El quiz no es tuyo regalon"]);

        //Validar campos del quiz
        $request -> validate([
            'name' => "min:10|max:30",
            'description' => "nullable|min:10|max:500"
        ]);

        $questions = $request["questions"];
        $errors = $this->validateQuestions($questions);        


        $hayImagen = false;
        $imageName = "";

        //Si se subio una imagen
        if($request["image"]) {
            //Verificar solo si es una imagen difernte a la que ya tiene
            if($request["image"]!== $quiz["image"]){
                //Validar imagen subida
                $validarImagen = $this->validateImage($request["image"]);           

                if (!$validarImagen["valid"]) {
                    $errors[] = "image_error " . $validarImagen["message"];
                } else {

                    $hasImage = false;
                    $currentImageDelted = false;

                    //ver si el quiz ya tenia una imagen
                    if ($quiz["image"]) {
                        $hasImage = true;

                        //Verificar que la imagen exista
                        if(File::exists("uploads/".$quiz["image"])){
                        $currentImageDelted = File::delete("uploads/".$quiz["image"]);
                        }                 
                    }

                    if($hasImage){
                        if($currentImageDelted){
                            $imagenGuardada = $this->saveImage($validarImagen['image_data']);
                            if (!$imagenGuardada['stored']) {
                                $errors[] = "image_error No se pudo guardar la imagen";
                            } else {
                                $hayImagen = true;
                                $imageName = $imagenGuardada["image_name"];
                            }
                        }else{
                            $errors[] = "image_error No se pudo guardar la imagen";
                        }
                    }else{
                        $imagenGuardada = $this->saveImage($validarImagen['image_data']);
                        if (!$imagenGuardada['stored']) {
                            $errors[] = "image_error No se pudo guardar la imagen";
                        } else {
                            $hayImagen = true;
                            $imageName = $imagenGuardada["image_name"];
                        }
                    }
                    
                }
            }
        }

        //Si hay errores retornar
        if(count($errors)>0){
            return back() -> withErrors(["questions" => implode("|",$errors)]);
        }

        //Actualizar quiz
        $quiz["name"] = $request["name"];
        $quiz["description"] = $request["description"];
        $quiz["isPublic"] = $request["public"];
        $quiz["category_id"] = $request["category"];
        $quiz["image"] = $hayImagen ? $imageName : $quiz["image"];
        $quiz -> save();

        //Eliminar todas las preguntas
        $quiz -> Questions() -> delete();

        //Guardar preguntas y respuestas
        foreach ($questions as $q) {
            $question =  QuizQuestion::create([
                "quiz_id" => $quiz["id"],
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
        return back() ->with('success', 'Quiz actualizado correctamente');
    }

    public function validateQuestions($questions){

        $errors = [];

        //Verificar que sean 5 preguntas
        if(count($questions) < 5){
            $errors[] = "no_questions El quiz debe tener al menos 5 preguntas";
        }

        foreach ($questions as $question) {
            //Verificar que la pregunta tenga un mínimo de largo
            if(strlen($question["question_text"])<3){
                $errors[] = $question["id"] ." La pregunta debe tener mínimo 3 caracteres";
            }

            //Verificar que la pregunta tenga no supere el máximo de largo
            if(strlen($question["question_text"])>150){
                $errors[] = $question["id"] ." La pregunta debe tener máximo 150 caracteres";
            }

            
            //Verificar que exista un order
            if(!is_numeric($question["order"])){
                $errors[] = $question["id"] ."Una pregunta no tiene un número de orden (Algo hiciste ??)";
            }
            
            //Verificar que al menos existan 5 respuestas a la pregunta
            $answers = $question["answers"];
            if(count($answers) < 5){
                $errors[] = $question["id"] ." La pregunta debe tener 5 respuestas";
            }


            //Verificar respuestas
            if(count($answers)>0){
                $numberOfCorrects = 0;
                foreach ($answers as $answer) {
                    $numberOfCorrects = $answer["is_correct"] == true ? $numberOfCorrects +1 : $numberOfCorrects;

                    //Verificar que la respuesta tenga un mínimo de largo
                    if(strlen($answer["answer_text"])<0){
                        $errors[] = $question["id"] ." hay una respuesa vacía";
                    }

                    //Verificar que la respuesta tenga un mínimo de largo
                    if(strlen($answer["answer_text"])>60){
                        $errors[] = $question["id"] ." La respuesta ".substr($answer["answer_text"], 0, 10)."... tiene mas de 60 caracteres";
                    }

                }
                
                //Verificar que solo una respuesta sea correcta 
                if($numberOfCorrects < 1){
                    $errors[] = $question["id"] ." La pregunta debe tener una respuesta correcta";
                }
            }          
            
        }

        return $errors;
    }

    public function validateImage($dataUrl){

        // Verificamos si hay una imagen
        if ($dataUrl) {
            // Extraemos el contenido base64 del Data URL
            $base64Image = preg_replace('/^data:image\/\w+;base64,/', '', $dataUrl);
            $imageData = base64_decode($base64Image);

            // Tipos permitidos
            $tiposPermitidos = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
                "image/avif"
            ];

            // Obtener la extensión del archivo
            $extension = finfo_buffer(finfo_open(), $imageData, FILEINFO_MIME_TYPE);

            //Validar extensión del archivo
            if (!in_array($extension, $tiposPermitidos)) {
                return [
                    "valid" => false,
                    "message" => "El formato del archivo no es valido",
                    "image_data" => null
                ];
            }

            // Obtenemos el tamaño de la imagen en bytes
            $imageSize = strlen($imageData);

            //Tamaño maximo del archivo (5MB)
            $maxSize = 5 * 1024 * 1024;

            //Validar que la imagen no sobrepase el tamaño maximo
            if ($imageSize > $maxSize) {
                return [
                    "valid" => false,
                    "message" => "El tamaño de la imagen no puede ser superior a 5MB",
                    "image_data" => null
                ];
            }

            return [
                "valid" => true,
                "message" => "La imagen es valida",
                "image_data" => $imageData
            ];
        }else{
            return [
                "valid" => true,
                "message" => "No se pudo subir la imagen",
                "image_data" => null
            ];
        }
    }

    public function saveImage($imageData){
        if(!$imageData){
            return [
                "stored" => false,
                "message" => "No se recibio una imagen",
                "image_name" => ""
            ];
        }

        //Generamos un nombre único para el archivo
        $fileName = uniqid() . '.png';

        //Ruta de destino absoluta
        $path = public_path('uploads/' . $fileName);

        //Intentamos guardar la imagen directamente
        $escrito = file_put_contents($path, $imageData);

        if (!$escrito) {
                return [
                "stored" => false,
                "message" => "No se pudo subir el imagen :/",
                "image_name" => ""
            ];
        }

        return [
            "stored" => true,
            "message" => "Imagen guardada",
            "image_name" => $fileName
        ];
    }
}
