<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Services\DateUtils;
use App\Tag;
use App\Jobs\StatTagJob;

class StatTag extends Model
{
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stat_tags';


    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['tag_id', 'action', 'created_date'];


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
        'search',
    ];


    /**
     * Launch Stat Resource Job
     * 
     */
    public static function launchStatTagJob($tag_id, $action)
    {
        StatTagJob::dispatch($tag_id, $action);
    }


    /**
     * Method to save specifique action on Resource
     * 
     */
    public static function saveAction($tag_id, $action)
    {
        $tag = Tag::find($tag_id);

        if ($tag && array_search($action, StatTag::$actions) !== FALSE) {
            $s = new StatTag();
            $s->tag_id = $tag_id;
            $s->action = $action;
            $s->created_date = DateUtils::GetCurrentDate();
            $s->save();
        }
    }

}
