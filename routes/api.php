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

# Login
Route::post('login', 'AdminController@login');

# Tag
Route::get('main/tags', 'TagController@indexPublic');

# Suggestions
Route::apiResource('suggestions', 'SuggestionController')->only(['store']);

# Contacts
Route::apiResource('contacts', 'ContactController')->only(['store']);

# Resources
Route::post('resources/search', 'ResourceTagController@search');
Route::get('resources/image/{id}', 'ResourceController@getImage');
Route::get('resources/like/add/{id}', 'ResourceController@addLike');
Route::get('resources/like/remove/{id}', 'ResourceController@removeLike');


# Admin routes
Route::group(['middleware' => 'admin'], function () {

    # Resources
    Route::apiResource('resources', 'ResourceController')->only(['index', 'show',
    'store', 'update', 'destroy']);
    Route::post('import/resources', 'ResourceController@importResources');
    Route::post('resources/image/{id}', 'ResourceController@uploadImage');

    # Tags
    Route::apiResource('tags', 'TagController')->only(['index', 'show',
    'store', 'update', 'destroy']);
    Route::post('import/tags', 'TagController@importTags');

    # Suggestions
    Route::apiResource('suggestions', 'SuggestionController')->only(['index', 'destroy']);
    
    # Contacts
    Route::apiResource('contacts', 'ContactController')->only(['index', 'destroy']);

    # Prices
    Route::apiResource('prices', 'PriceController')->only(['index', 'store', 'update', 'destroy']);
    
    # Types
    Route::apiResource('types', 'TypeController')->only(['index']);

    # Logout
    Route::get('logout', 'AdminController@logout');

    # Log Controller
    Route::get('current/visitors', 'LogController@getCurrentVisitor');
    Route::post('visitors', 'LogController@getVisitorNumberByDay');
    Route::post('logs', 'LogController@getLogs');

});
