<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\DestroyTask;
use App\Http\Requests\Task\IndexTask;
use App\Http\Requests\Task\StoreTask;
use App\Http\Requests\Task\UpdateTask;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{

    public function index(IndexTask $request): JsonResponse {
        $perPage = $request->input('per_page') ?? 10;
        $data = DB::table('tasks')
            ->join('clients', 'tasks.client_id', '=', 'clients.id')
            ->join('users', 'tasks.creator_id', '=', 'users.id')
            ->paginate($perPage);

        return response()->json($data, 200);
    }

    public function store(StoreTask $request): JsonResponse {
        return response()->json([], 200);
    }

    public function update(UpdateTask $request, int $taskId): JsonResponse {
        return response()->json([], 200);
    }

    public function destroy(DestroyTask $request, int $taskId): JsonResponse {
        return response()->json(null, 204);
    }
}
