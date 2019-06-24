<?php

use Illuminate\Http\Request;

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

Route::post('login', 'AdminController@login');


Route::apiResources([
    'resources' => 'ResourceController',
    'tags' => 'TagController',
]);
// Route::delete('suggestions/{id}', 'SuggestionController@destroy');
Route::apiResource('suggestions', 'SuggestionController')->only([
    'index', 'store', 'destroy'
]);

Route::post('import/tags', 'TagController@importTags');
Route::post('import/resources', 'ResourceController@importResources');
Route::post('resources/search', 'ResourceTagController@search');



Route::group(['middleware' => 'admin'], function () {

    Route::get('/test', 'AdminController@test');
    Route::get('/logout', 'AdminController@logout');

});
