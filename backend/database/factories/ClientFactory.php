<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use Faker\Generator as Faker;

$factory->define(Client::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'contact' => $faker->email,
        'updated_at' => $faker->dateTime,
        'created_at' => $faker->dateTime,
    ];
});
