<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Comment as CommentResource;

class Task extends JsonResource
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
            'title' => $this->title,
            'estimate' => $this->estimate,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'rank' => $this->rank,
            'deadline' => $this->deadline,
            'finished_at' => $this->finished_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'creator' => UserResource::make($this->creator),
            'assignee' => UserResource::make($this->assignee),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
