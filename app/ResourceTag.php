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
    protected static $finalScoringWeight = array(
        'score'         =>  10,
        'belonging'     =>  8,
        'public'        =>  7,
        'price'         =>  6,
        'interface'     =>  3,
    );

    /**
     * Compute final score with scoring weight
     * 
     */
    protected static function computeFinalScore($resource_score, $belonging_score, $public_score,
        $price_score, $interface_score)
    {
        $scoringWeight = ResourceTag::$finalScoringWeight;
        $factor = array_sum($scoringWeight);

        return round(((
            $resource_score * $scoringWeight['score'] +
            $belonging_score * $scoringWeight['belonging'] +
            $public_score * $scoringWeight["public"] +
            $price_score * $scoringWeight["price"] +
            $interface_score * $scoringWeight["interface"]
        ) / $factor) * 10, 2);
    }


    /**
     * Scoring price values
     * 
     */
    protected static $scoringPrice = array(
        'free'              =>  10,
        'freemium'          =>  8,
        'cost_1'            =>  6,
        'cost_2'            =>  4,
        'cost_3'            =>  2,
        'purchase_1'        =>  5,
        'free_freemium'     =>  9,
        'free_cost_1'       =>  7,
        'free_cost_2'       =>  5,
        'free_const_3'      =>  3,
        'free_purchase_1'   =>  6,
    );

    /**
     * Compute Price Score
     * 
     */
    protected static function computePriceScore($price)
    {
        if (!array_key_exists($price, ResourceTag::$scoringPrice)) {
            return 0;
        }

        return ResourceTag::$scoringPrice[$price];
    }

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
    protected static function computePublicScore($like, $visits, $total_likes, $total_visits)
    {
        $like_score = 0;
        if ($total_likes)
            $like_score = $like / $total_likes;
        
        $visit_score = 0;
        if ($total_visits)
            $visit_score = $visits / $total_visits;
    
        return (
            $like_score * ResourceTag::$like_score_factor + 
            $visit_score * ResourceTag::$visit_score_factor);
    }


    /**
     * Compute Tags Beloging Score
     * 
     */
    protected static function computeBelongingScore($resource_tags_dict, $search_tag_ids)
    {
        $matched_ids = array_intersect(array_keys($resource_tags_dict), $search_tag_ids);
        $unmatched_ids_from_research = array_diff(array_keys($resource_tags_dict), $search_tag_ids);        
        $unmatched_ids_from_resource = array_diff($search_tag_ids, array_keys($resource_tags_dict));

        $count_all_ids = sizeof($matched_ids) + sizeof($unmatched_ids_from_research) + sizeof($unmatched_ids_from_resource) * 0.5;
        $belonging_score = 0;
        foreach ($matched_ids as $match_id) {
            $belonging_score += $resource_tags_dict[$match_id];
        }

        return $belonging_score / $count_all_ids;
    }


    /**
     * Compute resources recommendation
     * 
     */
    public static function getRecommendedResources($resource_tags)
    {
        $resources = array();
        $total_likes = 0;
        $total_visits = 0;
                $total_likes += $resource['like'];
                $total_visits += $resource['visits'];

        // Create data structure for resources
        foreach ($resource_tags as $resource_tag) {
            $resource_id = $resource_tag->resource->id;
            
            if (!array_key_exists($resource_id, $resources)) {
                $resources[$resource_id] = array(
                    "id"            =>  $resource_tag->resource->id,
                    "name"          =>  $resource_tag->resource->name,
                    "description"   =>  $resource_tag->resource->description,
                    "url"           =>  $resource_tag->resource->url,
                    "image"         =>  $resource_tag->resource->image,
                    "language"      =>  $resource_tag->resource->language,
                    "score"         =>  $resource_tag->resource->score,
                    "like"          =>  $resource_tag->resource->like,
                    "price"         =>  $resource_tag->resource->price,
                    "price_slug"    =>  $resource_tag->resource->price->slug,
                    "type"          =>  $resource_tag->resource->type->name,
                    "interface"     => $resource_tag->resource->interface,
                    "belonging"     =>  array($resource_tag->belonging),
                    "final_score"   => 0,
                );
            } else {
                array_push($resources[$resource_id]["belonging"], $resource_tag->belonging);
            }
        }

        // Compute scoring 
        $scoringWeight = ResourceTag::$scoringWeight;
        $scoringPrice = ResourceTag::$scoringPrice;
        $factor = array_sum($scoringWeight);

        foreach ($resources as &$resource) {
            
            $belonging_score = array_sum($resource["belonging"]) / sizeof($resource["belonging"]);
            $price_score = $scoringPrice[$resource["price_slug"]];
            $interface_score = ResourceTag::computeInterfaceScore($resource["interface"]);

            $final_score = round(((
                $resource["score"] * $scoringWeight["score"] +
                $belonging_score * $scoringWeight["belonging"] +
                $like_score * $scoringWeight["like"] +
                $price_score * $scoringWeight["price"] +
                $interface_score * $scoringWeight["interface"]
            ) / $factor) * 10, 2);

            $resource["final_score"] = $final_score;
            $public_score = ResourceTag::computePublicScore($resource['like'], $resource['visits'], $total_likes, $total_visits);
        }

        // Order resources by final score (descending)
        usort($resources ,function($first,$second){
            return $first["final_score"] < $second["final_score"];
        });

        // Remove useless attributes
        foreach ($resources as &$resource) {
            unset($resource["like"]);
            unset($resource["score"]);
            unset($resource["price_slug"]);
            unset($resource["interface"]);
            unset($resource["belonging"]);
            unset($resource["final_score"]);
        }

        return $resources;
    }
}
