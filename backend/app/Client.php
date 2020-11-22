<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $fillable = [
        'name',
        'contact',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
