<?php

namespace App\Http\Requests\transaction;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
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
            "type" => ['required', 'string'],
            'montant' => ['required', 'numeric'],
            'category_id' => ['required'],
            'date' => ['required'],
            'description' => ['required', 'string'],
            'note' => ['nullable', 'string'],
        ];
    }
}
