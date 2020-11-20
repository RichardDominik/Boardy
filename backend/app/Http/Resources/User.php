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
            'createdTasks' => TaskResource::collection($this->whenLoaded('createdTasks')),
            'assignedTasks' => TaskResource::collection($this->whenLoaded('assignedTasks')),
        ];
    }
}
