<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\AllUser;
use App\Http\Requests\User\IndexUser;
use App\Http\Requests\User\ShowUser;
use App\Http\Resources\UserCollection;
use App\Http\Resources\User as UserResource;
use App\User;

class UserController extends Controller
{
    public function index(IndexUser $request) : UserCollection {
        $orderByColumn = 'id';
        $orderDirection = 'asc';

        if($request->has('orderBy')) {
            $orderByColumn = $request->get('orderBy');
        }

        if($request->has('orderDirection')) {
            $orderDirection = $request->get('orderDirection');
        }

        return new UserCollection(User::orderBy($orderByColumn, $orderDirection)->paginate());
    }

    public function all(AllUser $request) : UserCollection {
        return new UserCollection(User::all());
    }

    public function show(ShowUser $request, $id) : UserResource {
        return new UserResource(User::findOrFail($id)->loadMissing(['createdTasks', 'assignedTasks']));
    }
}
