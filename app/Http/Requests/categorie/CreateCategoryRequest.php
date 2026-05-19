<?php

namespace App\Http\Requests\categorie;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class CreateCategoryRequest extends FormRequest
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
            "nom" => ['required', 'string'],
            "type" => ['required'],
            "couleur" => ['required'],
            "icon" => ['nullable'],
        ];
    }

    public function messages()
    {
        return [
            "nom.required" => "Le nom de la categorie est requis",
            "type.required" => "Le type de la categorie est requis",
            "couleur.required" => "La couleur de la categorie est requise",
        ];
    }
}
