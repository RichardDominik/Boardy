<?php

use App\Comment;
use App\Task;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tasks = Task::all();

        collect(range(1, 50))->each(static function ($i) use ($tasks) {
            factory(Comment::class, 1)->create([
                'task_id' => $tasks->random()->id,
                'user_id' => $i % 2 ? $tasks->random()->assignee->id : $tasks->random()->creator->id,
                'rank' => $i % 5 ? rand(0, 5) : null,
            ]);
        });
    }
}
