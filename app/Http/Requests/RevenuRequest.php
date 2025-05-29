<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RevenuRequest extends FormRequest
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
            "date" => "required",
            "montant" => "required",
            "category_id" => "required",
            "description" => "required",
        ];
    }

    public function messages()
    {
       return [
            "date.required" => "Choisissez une date",
            "montant.required" => "Saisissez un montant",
            "category_id.required" => "Choisissez une catégorie",
            "description.required" => "Saisissez une description",
        ];
    }
}
