<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User as UserResource;

class Comment extends JsonResource
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
            'rank' => $this->rank,
            'comment' => $this->comment,
            'user' => UserResource::make($this->user),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
