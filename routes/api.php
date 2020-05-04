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
Route::get('resources/visit/{id}', 'ResourceController@addVisit');
Route::get('stats', 'StatsController@getTopResources');

# Test
Route::get('test', 'TestController@execute');

# Artisan
Route::get('artisan/queues', 'ArtisanController@QueueWorkCommand');


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
    Route::get('tags/disable/{id}', 'TagController@disableTag');
    Route::get('tags/enable/{id}', 'TagController@enableTag');
    Route::get('tags/restore/{id}', 'TagController@restoreTag');
    Route::get('tags/primary/{id}', 'TagController@tagIsPrimary');
    Route::get('tags/secondary/{id}', 'TagController@tagIsSecondary');

    # Suggestions
    Route::apiResource('suggestions', 'SuggestionController')->only(['index', 'destroy']);
    
    # Contacts
    Route::apiResource('contacts', 'ContactController')->only(['index', 'destroy']);

    # Prices
    Route::apiResource('prices', 'PriceController')->only(['index', 'store', 'update', 'destroy']);
    
    # Types
    Route::apiResource('types', 'TypeController')->only(['index', 'store', 'update', 'destroy']);

    # Logout
    Route::get('logout', 'AdminController@logout');

    # Log Controller
    Route::post('logs', 'LogController@getLogs');

    # Stat Controller
    Route::get('stats/visitors/current', 'StatsController@getCurrentDayVisitor');
    Route::post('stats/visitors/period', 'StatsController@getVisitorNumberByDat');
    Route::post('stats/tags/search', 'StatsController@countSearchTags');
    Route::post('stats/resources/trend', 'StatsController@getTopTrendyResources');
    Route::get('stats/resources/alltime', 'StatsController@getTopAllTimeResources');


    # Artisan
    Route::get('artisan/migration', 'ArtisanController@DatabaseMigrationCommand');
    Route::get('artisan/seeds', 'ArtisanController@DatabaseSeedingCommand');
    Route::get('artisan/config', 'ArtisanController@ConfigClearCommand');
    Route::get('artisan/cache', 'ArtisanController@CacheClearCommand');
    
});
