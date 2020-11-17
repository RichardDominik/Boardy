<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->float('estimate');
            $table->text('description');
            $table->enum('status', ['free', 'in_progress', 'to_test', 'done'])->default('free');
            $table->enum('priority', ['low', 'medium', 'high']);
            $table->float('rank')->nullable();
            $table->timestamp('deadline', 0);
            $table->timestamp('finished_at', 0);
            $table->foreignId('client_id')->constrained('clients');
            $table->foreignId('creator_id')->constrained('users');
            $table->foreignId('assignee_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
