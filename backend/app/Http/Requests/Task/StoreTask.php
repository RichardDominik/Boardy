<?php

namespace App\Http\Requests\Task;

use App\Task;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class StoreTask extends FormRequest
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
            'title' => ['required', 'string'],
            'estimate' => ['required', 'integer'],
            'description' => ['sometimes', 'nullable'],
            'priority' => ['required', Rule::in(Task::getAllPriorities())],
            'deadline' => ['required', 'date_format:d/m/Y H:i'],
            'client_id' => ['sometimes', 'nullable'],
            'assignee_id' => ['sometimes', 'nullable'],
            'parent_id' => ['sometimes', 'nullable'],
        ];
    }

    public function getSanitized() : array
    {
        $sanitized = $this->validated();
        $sanitized['deadline'] = Carbon::createFromFormat('d/m/Y H:i', $this->get('deadline'));

        if ($this->has('assignee_id') && !is_null($this->get('assignee_id'))) {
            $sanitized['status'] = Task::TASK_STATUS_IN_PROGRESS;
        } else {
            $sanitized['status'] = Task::TASK_STATUS_FREE;
        }

        $sanitized['creator_id'] = auth()->user()->id;
        return $sanitized;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}