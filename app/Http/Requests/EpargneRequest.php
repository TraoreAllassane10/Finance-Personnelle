<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EpargneRequest extends FormRequest
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
            'date' => "required",
            'montant' => 'required',
            'compte' => 'required',
            'projet' => 'required'
        ];
    }

     public function messages()
    {
       return [
            "date.required" => "Choisissez une date",
            "montant.required" => "Saisissez un montant",
            "compte.required" => "Saisissez le nom d'une banque ou d'un operateur",
            "projet.required" => "Saisissez une description",
        ];
    }
}
