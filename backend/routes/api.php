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

Route::middleware(['auth:api'])->group(function () {
    Route::prefix('tasks')->group(static function() {
        Route::get('/',                                     'TaskController@index');
        Route::post('/',                                    'TaskController@store');
        Route::get('/{id}',                                 'TaskController@show');
        Route::post('/{id}',                                'TaskController@update')->name('update');
        Route::delete('{id}',                               'TaskController@destroy')->name('destroy');
    });

    Route::prefix('all-tasks-without-parent')->group(static function() {
        Route::get('/',                                     'TaskController@allTasksWithoutParent');
    });

    Route::prefix('users')->group(static function() {
        Route::get('/',                                     'UserController@index');
        Route::get('/get/{id}',                             'UserController@show');
        Route::get('/all',                                  'UserController@all');
    });

    Route::prefix('clients')->group(static function() {
        Route::get('/all',                                  'ClientController@all');
    });

    Route::prefix('comments')->group(static function() {
        Route::post('/',                                    'CommentController@store');
        Route::delete('{id}',                               'CommentController@destroy')->name('destroy');
    });
});

