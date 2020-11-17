<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'task_id' => $faker->randomNumber(5),
        'user_id' => $faker->randomNumber(5),
        'rank' => $faker->randomNumber(5),
        'comment' => $faker->sentence,
    ];
});
