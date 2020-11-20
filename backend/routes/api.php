<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('user-profile', 'AuthController@userProfile');
});


Route::middleware(['api'])->group(function () {
    Route::prefix('tasks')->group(static function() {
        Route::get('/',                                     'TaskController@index');
        Route::post('/',                                    'TaskController@store');
        Route::get('/{id}',                                 'TaskController@show')->name('update');
        Route::post('/{id}',                                'TaskController@update')->name('update');
        Route::delete('{id}',                               'TaskController@destroy')->name('destroy');
    });
});

