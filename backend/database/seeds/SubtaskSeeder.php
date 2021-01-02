<?php

use App\Task;
use App\User;
use Illuminate\Database\Seeder;

class SubtaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tasks = Task::all();
        $users = User::all();

        collect(range(1, 20))->each(static function ($i) use ($tasks, $users) {
            $parentTask = $tasks->random();

            factory(Task::class, 1)->create([
                'client_id' => $parentTask->client_id,
                'creator_id' => $parentTask->creator_id,
                'assignee_id' => $users->random()->id,
                'parent_id' => $parentTask->id,
            ]);
        });
    }
}
