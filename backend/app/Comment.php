<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{

    protected $fillable = [
        'task_id',
        'user_id',
        'rank',
        'comment',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    /* ************************ RELATIONS ************************* */

    public function user() : BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function task() : BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
