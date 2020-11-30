<?php

namespace App\Http\Requests\Task;

use App\Task;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTask extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string'],
            'estimate' => ['sometimes', 'integer'],
            'description' => ['sometimes', 'string'],
            'priority' => ['sometimes', Rule::in(Task::getAllPriorities())],
            'status' => ['sometimes', Rule::in(Task::getAllStatuses())],
            'deadline' => ['sometimes', 'date_format:d/m/Y H:i'],
            'client_id' => ['sometimes', 'integer'],
            'assignee_id' => ['sometimes', 'nullable'],
        ];
    }

    public function getSanitized() : array
    {
        $sanitized = $this->validated();

        if ($this->has('deadline')){
            $sanitized['deadline'] = Carbon::createFromFormat('d/m/Y H:i', $this->get('deadline'));
        }

        if ($this->has('assignee_id') && !is_null($this->get('assignee_id'))) {
            $sanitized['status'] = Task::TASK_STATUS_IN_PROGRESS;
        } else if($this->has('assignee_id') && is_null($this->get('assignee_id'))) {
            $sanitized['status'] = Task::TASK_STATUS_FREE;
        }

        if ($this->has('status') && $this->get('status') == Task::TASK_STATUS_DONE) {
            $sanitized['finished_at'] = Carbon::now();
        }

        return $sanitized;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}