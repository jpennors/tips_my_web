<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ResourceTag extends Model
{
    use SoftDeletes;


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'resource_tags';


    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['resource_id', 'tag_id', 'belonging'];


    /**
     * Define dates
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


    // protected $appends = ['tag', 'resource'];


    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;


    /**
     * The resource that belong to the resource_tag.
     */
    public function resource()
    {
        return $this->belongsTo('App\Resource');
    }


    /**
     * The tag that belong to the resource_tag.
     */
    public function tag()
    {
        return $this->belongsTo('App\Tag');
    }


    /**
     * Function for attribute Tag
     */
    public function getTagAttribute(){
        $tags = $this->tag()->get();
        if ($tags) {
            return $tags->first();
        }
    }


    /**
     * Function for attribute Resource
     */
    public function getResourceAttribute(){
        $resources = $this->resource()->get();
        if ($resources) {
            return $resources->first();
        }

    }

}
