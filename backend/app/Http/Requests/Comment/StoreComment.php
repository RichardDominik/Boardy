<?php

namespace App\Http\Requests\Comment;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreComment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() : bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() : array
    {
        return [
            'comment' => ['required', 'string'],
            'rank' => ['sometimes', 'nullable'],
            'task_id' => ['required', 'integer'],
        ];
    }

    public function getSanitized() : array
    {
        $sanitized = $this->validated();

        $sanitized['user_id'] = auth()->user()->id;
        return $sanitized;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}