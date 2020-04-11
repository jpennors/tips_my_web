<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ResourceTag extends Model
{


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

    protected $appends = ['tag'];


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

    /**
    * Rules pour Validator
    *
    * @var array
    */
    public static $rules = [
        'resource_id'           =>      'required|exists:resources,id',
        'tag_id'                =>      'required|exists:tags,id',
        'belonging'             =>      'required|integer|min:0|max:0'
    ];


    /**
     * Scoring weight values
     * 
     */
    protected static $scoringWeight = array(
        "score"         =>  10,
        "belonging"     =>  8,
        "like"         =>  7,
        "price"         =>  6,
        "interface"     =>  3,
    );


    /**
     * Scoring price values
     * 
     */
    protected static $scoringPrice = array(
        "free"              =>  10,
        "freemium"          =>  8,
        "cost_1"            =>  6,
        "cost_2"            =>  4,
        "cost_3"            =>  2,
        "purchase_1"        =>  5,
        "free_freemium"     =>  9,
        "free_cost_1"       =>  7,
        "free_cost_2"       =>  5,
        "free_const_3"      =>  3,
        "free_purchase_1"   =>  6,
    );


     /**
     * Scoring interface values
     * 
     */
    protected static $scoringInterface = array(
        1   =>  4,
        2   =>  7,
        3   =>  10,
    );


    /**
     * Compute Interface Score
     * 
     */
    protected static function computeInterfaceScore($interface)
    {
        if (!$interface) {
            return 0;
        }

        return ResourceTag::$scoringInterface[$interface];
    }


    /**
     * Compute Like Score
     * 
     */
    protected static function computeLikeScore($like, $total_like)
    {
        if (!$total_like) {
            return 0;
        }

        return ($like / $total_like) * 10;
    }


    /**
     * Compute resources recommendation
     * 
     */
    public static function getRecommendedResources($resource_tags)
    {
        $resources = array();
        $total_likes = 0;

        // Create data structure for resources
        foreach ($resource_tags as $resource_tag) {
            $resource_id = $resource_tag->resource->id;
            
            if (!array_key_exists($resource_id, $resources)) {
                $resources[$resource_id] = array(
                    "name"          =>  $resource_tag->resource->name,
                    "description"   =>  $resource_tag->resource->description,
                    "url"           =>  $resource_tag->resource->url,
                    "image"         =>  $resource_tag->resource->image,
                    "language"      =>  $resource_tag->resource->language,
                    "score"         =>  $resource_tag->resource->score,
                    "like"          =>  $resource_tag->resource->like,
                    "price"         =>  $resource_tag->resource->price->slug,
                    "type"          =>  $resource_tag->resource->type->name,
                    "interface"     => $resource_tag->resource->interface,
                    "belonging"     =>  array($resource_tag->belonging),
                    "final_score"   => 0,
                );
                $total_likes += $resource_tag->resource->like;
            } else {
                array_push($resources[$resource_id]["belonging"], $resource_tag->belonging);
            }
        }
    }
}
