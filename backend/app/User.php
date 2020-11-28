<?php

namespace App;

use Carbon\CarbonInterval;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

// JWT contract
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject {
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_project_manager',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    protected $appends = ['avg_task_priority', 'rank', 'avg_time'];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }

    public function getAvgTaskPriorityAttribute() {
        $avgPriority = round($this->assignedTasks->pluck('priority')->map(function($item){
            return ['priority' => Task::getPriorityRank($item)];
        })->avg('priority'));

        return $avgPriority == 0 ? 0 : Task::getPriorityByRank($avgPriority);
    }

    public function getRankAttribute() {
        $rank = 0;
        $count = 0;

        $this->assignedTasks->each(function ($task) use(&$rank, &$count) {
            if(isset($task->rank)){
                $rank += $task->rank * Task::getPriorityRank($task->priority);
                $count += Task::getPriorityRank($task->priority);
            }
        });

        return ($rank != 0 && $count != 0) ? round($rank / $count, 1) : 0;
    }

    public function getAvgTimeAttribute() {
        $getAverageCompletionTime = DB::table('tasks')
            ->select(DB::raw("((DATE_PART('day', finished_at::timestamp - created_at::timestamp) * 24 + 
                DATE_PART('hour', finished_at::timestamp - created_at::timestamp)) * 60 +
                DATE_PART('minute', finished_at::timestamp - created_at::timestamp)) * 60 +
                DATE_PART('second', finished_at::timestamp - created_at::timestamp) as time_diff"))
            ->where('assignee_id', $this->id)
            ->whereNotNull('finished_at')
            ->get()
            ->avg('time_diff');

        $averageCompletionTime = CarbonInterval::seconds((int)$getAverageCompletionTime)
            ->cascade()
            ->forHumans();

        return isset($getAverageCompletionTime) ? $averageCompletionTime : null;
    }

    /* ************************ RELATIONS ************************* */

    public function createdTasks() : HasMany {
        return $this->hasMany(Task::class, 'creator_id');
    }

    public function assignedTasks() : HasMany {
        return $this->hasMany(Task::class, 'assignee_id');
    }

    public function comments() : HasMany {
        return $this->hasMany(Comment::class);
    }
}
