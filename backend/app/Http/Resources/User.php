<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Task as TaskResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'is_project_manager' => $this->is_project_manager,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'numberOfAssignedTasks' => $this->whenLoaded('assignedTasks', function() {
                return $this->assignedTasks->count();
            }),
            'createdTasks' => TaskResource::collection($this->whenLoaded('createdTasks')),
            'assignedTasks' => TaskResource::collection($this->whenLoaded('assignedTasks')),
            'avg_task_priority' => $this->avg_task_priority,
            'rank' => $this->rank,
            'avg_time' => $this->avg_time,
        ];
    }
}
