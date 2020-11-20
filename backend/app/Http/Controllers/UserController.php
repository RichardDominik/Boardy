<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\AllUser;
use App\Http\Requests\User\IndexUser;
use App\Http\Resources\UserCollection;
use App\User;

class UserController extends Controller
{
    public function index(IndexUser $request) : UserCollection {
        return new UserCollection(User::paginate());
    }

    public function all(AllUser $request) : UserCollection {
        return new UserCollection(User::all());
    }
}
