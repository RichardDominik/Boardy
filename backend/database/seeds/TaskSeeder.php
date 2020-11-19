<?php

use App\Client;
use App\Task;
use App\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $clients = Client::all();

        collect(range(1, 25))->each(static function ($i) use ($users, $clients) {
            factory(Task::class, 1)->create([
                'client_id' => $clients->random()->id,
                'creator_id' => $users->random()->id,
                'assignee_id' => $users->random()->id
            ]);
        });
    }
}
