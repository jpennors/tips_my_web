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

Route::apiResource('resources', 'ResourceController')->only(['index']);
Route::apiResource('tags', 'TagController')->only(['index']);

Route::apiResource('suggestions', 'SuggestionController')->only(['store']);
Route::apiResource('contacts', 'ContactController')->only(['store']);


Route::post('resources/search', 'ResourceTagController@search');
Route::get('resources/image/{id}', 'ResourceController@getImage');

Route::get('resources/like/add/{id}', 'ResourceController@addLike');
Route::get('resources/like/remove/{id}', 'ResourceController@removeLike');

# Admin routes
Route::group(['middleware' => 'admin'], function () {

    Route::apiResource('resources', 'ResourceController')->only(['show',
    'store', 'update', 'destroy']);

    Route::apiResource('tags', 'TagController')->only(['show',
    'store', 'update', 'destroy']);

    Route::apiResource('suggestions', 'SuggestionController')->only(['index', 'destroy']);
    Route::apiResource('contacts', 'ContactController')->only(['index', 'destroy']);

    Route::apiResource('prices', 'PriceController')->only(['index']);
    Route::apiResource('types', 'TypeController')->only(['index']);

    Route::post('import/tags', 'TagController@importTags');
    Route::post('import/resources', 'ResourceController@importResources');

    Route::post('resources/image/{id}', 'ResourceController@uploadImage');

    Route::get('logout', 'AdminController@logout');

});
