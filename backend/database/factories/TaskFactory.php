<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Task;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$factory->define(Task::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'estimate' => $faker->randomNumber(5),
        'description' => $faker->text(),
        'status' => Arr::random(Task::getAllStatuses()),
        'priority' => Arr::random(Task::getAllPriorities()),
        'rank' => 0,
        'deadline' => $faker->dateTime,
        'updated_at' => $faker->dateTime,
        'created_at' => $faker->dateTime,
        'client_id' => $faker->randomNumber(5),
        'creator_id' => $faker->randomNumber(5),
        'assignee_id' => $faker->randomNumber(5),
    ];
});
