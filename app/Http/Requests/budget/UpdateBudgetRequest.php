<?php

namespace App\Http\Requests\budget;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBudgetRequest extends FormRequest
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
            "montant_alloue" => ['required', "numeric"],
            "category_id" => ['required']
        ];
    }

    public function messages()
    {
        return [
            "montant_alloue.required" => "Le montant alloué est requis",
            "montant_alloue.numeric" => "Le montant alloué doit etre un nombre entier",
            "category_id.required" => "La categorie est requise",
        ];
    }
}
