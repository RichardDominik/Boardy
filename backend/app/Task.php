<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{

    protected $fillable = [
        'title',
        'estimate',
        'description',
        'status',
        'priority',
        'rank',
        'deadline',
        'client_id',
        'creator_id',
        'assignee_id',
        'finished_at',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'finished_at',
    ];

    /* ************************ CONSTANTS ************************* */

    const TASK_STATUS_FREE = 'free';
    const TASK_STATUS_IN_PROGRESS = 'in_progress';
    const TASK_STATUS_TO_TEST = 'to_test';
    const TASK_STATUS_DONE = 'done';

    const TASK_PRIORITY_LOW = 'low';
    const TASK_PRIORITY_MEDIUM = 'medium';
    const TASK_PRIORITY_HIGH = 'high';

    /* ************************ OTHER ************************ */

    public static function getAllStatuses() : array
    {
        return [
            self::TASK_STATUS_FREE,
            self::TASK_STATUS_IN_PROGRESS,
            self::TASK_STATUS_TO_TEST,
            self::TASK_STATUS_DONE
        ];
    }

    public static function getAllPriorities() : array
    {
        return [
            self::TASK_PRIORITY_LOW,
            self::TASK_PRIORITY_MEDIUM,
            self::TASK_PRIORITY_HIGH,
        ];
    }

    /* ************************ RELATIONS ************************* */

    public function client() : BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignee() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments() : HasMany
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'ASC');
    }
}
