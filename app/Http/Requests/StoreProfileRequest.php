<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreProfileRequest extends FormRequest
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
            "name" => "min:3|max:15",
            "biography" => "min:3|max:255|nullable",
            'image' => 'nullable|string',
        ];
    }

    public function after(): array{
        return [
            function (Validator $validator) {
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
