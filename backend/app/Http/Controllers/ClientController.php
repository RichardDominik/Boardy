<?php

namespace App\Http\Controllers;

use App\Client;
use App\Http\Requests\Client\AllClient;
use App\Http\Resources\ClientCollection;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function all(AllClient $request) : ClientCollection {
        return new ClientCollection(Client::all());
    }
}
