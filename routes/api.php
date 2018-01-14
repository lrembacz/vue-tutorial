<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware'=>['auth:api']], function () {

    Route::get('/user', function (Request $request) {
        if ($request->user()) {
            return [
                "status" => 1,
                "user" => $request->user()
            ];
        } else {
            return [
                "status" => 0,
            ];
        }

    });

    Route::get('/posts/', 'PostController@show');
    Route::get('/posts/{id}', 'PostController@show');
    Route::post('/posts', 'PostController@store');
    Route::put('/posts/{id}', 'PostController@update');
    Route::delete('/posts/{id}', 'PostController@destroy');

});