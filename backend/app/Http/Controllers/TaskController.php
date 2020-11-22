<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\DestroyTask;
use App\Http\Requests\Task\IndexTask;
use App\Http\Requests\Task\ShowTask;
use App\Http\Requests\Task\StoreTask;
use App\Http\Requests\Task\UpdateTask;
use App\Http\Resources\Task as TaskResource;
use App\Http\Resources\TaskCollection;
use App\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{

    public function index(IndexTask $request) : TaskCollection {
        return new TaskCollection(Task::paginate());
    }

    public function show(ShowTask $request, $id) : TaskResource {
        return new TaskResource(Task::findOrFail($id)->loadMissing('comments'));
    }

    public function store(StoreTask $request): JsonResponse {
        $sanitized = $request->getSanitized();
        $task = Task::create($sanitized);

        return (new TaskResource($task->loadMissing('comments')))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateTask $request, int $id): JsonResponse {
        $task = Task::findOrFail($id);
        $sanitized = $request->getSanitized();

        $task->update($sanitized);

        return (new TaskResource($task->loadMissing('comments')))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(DestroyTask $request, int $id): JsonResponse {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(null, 204);
    }
}
