<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreQuizRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'min:10|max:60',
            'description' => 'nullable|min:10|max:500',
            'category' => 'numeric|min:1|max:12',
            'image' => 'nullable|string',
            'public' => 'required|boolean',
            'category' => 'required|numeric|min:1|max:12',
            'questions' => 'required|array|min:5',
            'questions.*.question_text' => 'required|min:5|max:150',
            'questions.*.order' => 'required|numeric',
            'questions.*.answers' => 'required|array|min:4|max:4',
            'questions.*.answers.*.is_correct' => 'required|boolean',
            'questions.*.answers.*.answer_text' => 'required|min:1|max:60'
        ];
    }

    public function messages(): array
    {
        return [
            // Quiz
            'name.required' => 'El nombre del quiz es obligatorio.',
            'name.min' => 'El nombre del quiz debe tener al menos :min caracteres.',
            'name.max' => 'El nombre del quiz no puede superar los :max caracteres.',

            'description.min' => 'La descripción debe tener al menos :min caracteres.',
            'description.max' => 'La descripción no puede superar los :max caracteres.',

            'public.required' => 'Debes indicar si el quiz es público o privado.',
            'public.boolean' => 'El valor de público no es válido.',

            'category.required' => 'La categoría es obligatoria.',
            'category.numeric' => 'La categoría seleccionada no es válida.',
            'category.min' => 'La categoría seleccionada no es válida.',
            'category.max' => 'La categoría seleccionada no es válida.',

            // Imagen
            'image.string' => 'La imagen enviada no es válida.',

            // Preguntas
            'questions.required' => 'Debes agregar al menos una pregunta.',
            'questions.array' => 'El formato de las preguntas no es válido.',
            'questions.min' => 'El quiz debe tener al menos :min preguntas.',

            'questions.*.question_text.required' => 'El texto de la pregunta es obligatorio.',
            'questions.*.question_text.min' => 'El texto de la pregunta debe tener al menos :min caracteres.',
            'questions.*.question_text.max' => 'El texto de la pregunta no puede superar los :max caracteres.',

            'questions.*.order.required' => 'El orden de la pregunta es obligatorio.',
            'questions.*.order.numeric' => 'El orden de la pregunta debe ser numérico.',

            // Respuestas
            'questions.*.answers.required' => 'Cada pregunta debe tener respuestas.',
            'questions.*.answers.array' => 'El formato de las respuestas no es válido.',
            'questions.*.answers.min' => 'Cada pregunta debe tener al menos :min respuestas.',
            'questions.*.answers.max' => 'Cada pregunta debe tener :max respuestas.',

            'questions.*.answers.*.answer_text.required' => 'El texto de la respuesta es obligatorio.',
            'questions.*.answers.*.answer_text.min' => 'La respuesta no puede estar vacía.',
            'questions.*.answers.*.answer_text.max' => 'La respuesta no puede superar los :max caracteres.',

            'questions.*.answers.*.is_correct.required' => 'Debes indicar si la respuesta es correcta.',
            'questions.*.answers.*.is_correct.boolean' => 'El valor de respuesta correcta no es válido.',
        ];
    }


    public function after(): array{
        return [
            function (Validator $validator) {
                //Iterar sobre las pregutnas. $qIndex: Índice de la pregunto,  $question: La pregunta completa
                foreach ($this->questions as $qIndex => $question) {
                    //Convertir arreglo de respuestas a colección, obtener todas las que tengan is_correct en true y contar
                    $correctCount = collect($question['answers'])
                        ->where('is_correct', true)
                        ->count();

                    //Si hay más o menos de una añadír error
                    if ($correctCount !== 1) {
                        $validator->errors()->add(
                            "questions.$qIndex.answers",
                            'Debe existir exactamente una respuesta correcta.'
                        );
                    }
                }

                //Ver si se envio una imagen
                if ($this->filled('image') && str_starts_with($this->image, 'data:image/')) {
                    $this->validateBase64Image($validator);
                }
            }
        ];
    }

    protected function validateBase64Image(Validator $validator): void
    {
        $image = $this->image;
        
        if (!preg_match('/^data:image\/(jpeg|jpg|png|webp);base64,/', $image)) {
            $validator->errors()->add('image', 'Formato de imagen inválido.');
            return;
        }

        $decoded = base64_decode(
            substr($image, strpos($image, ',') + 1),
            true
        );

        if ($decoded === false) {
            $validator->errors()->add('image', 'La imagen está corrupta.');
            return;
        }

        if (strlen($decoded) / 1024 / 1024 > 2) {
            $validator->errors()->add('image', 'La imagen no puede superar los 2MB.');
        }
    }
}
