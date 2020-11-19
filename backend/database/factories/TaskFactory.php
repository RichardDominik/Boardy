<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Task;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

$factory->define(Task::class, function (Faker $faker) {

    $createdAt = $faker->dateTimeBetween(Carbon::now()->subMonths(1), Carbon::now());
    $deadline = Carbon::instance($createdAt)->addDay(rand(2, 10));

    return [
        'title' => $faker->sentence,
        'estimate' => rand(1, 32),
        'description' => $faker->text(),
        'status' => Arr::random(Task::getAllStatuses()),
        'priority' => Arr::random(Task::getAllPriorities()),
        'rank' => rand(0, 5),
        'deadline' => $deadline,
        'updated_at' => $faker->dateTime,
        'created_at' => $createdAt,
        'client_id' => $faker->randomNumber(5),
        'creator_id' => $faker->randomNumber(5),
        'assignee_id' => $faker->randomNumber(5),
    ];
});
