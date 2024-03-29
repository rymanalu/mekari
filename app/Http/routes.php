<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'TodoController@index');

Route::group(['prefix' => 'api/todos'], function () {
    Route::post('/delete-bulk', 'TodoController@destroyBulk');
    Route::get('/', 'TodoController@all');
    Route::put('/{todo}', 'TodoController@update');
    Route::delete('/{todo}', 'TodoController@destroy');
    Route::post('/', 'TodoController@store');
});
