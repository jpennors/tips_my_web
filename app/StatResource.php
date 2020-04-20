<?php

namespace App;

use App\Jobs\StatResourceJob;
use Illuminate\Database\Eloquent\Model;
use App\Services\DateUtils;

class StatResource extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stat_resources';


    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['resource_id', 'action', 'created_date'];


    /**
     * Define dates
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at'];


    /**
     * Action possibilities
     * 
     */
    protected static $actions = [
        'like',
        'visit'
    ];


    /**
     * Launch Stat Resource Job
     * 
     */
    public static function launchStatResourceJob($resource_id, $action)
    {
        StatResourceJob::dispatch($resource_id, $action);
    }


    /**
     * Method to save specifique action on Resource
     * 
     */
    public static function saveAction($resource_id, $action)
    {
        $resource = Resource::find($resource_id);

        if ($resource && array_search($action, StatResource::$actions) !== FALSE) {
            $s = new StatResource();
            $s->resource_id = $resource_id;
            $s->action = $action;
            $s->created_date = DateUtils::GetCurrentDate();
            $s->save();
        }
    }
}
