<?php

namespace App;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Uuids;

class Tag extends Model
{
    use SoftDeletes;
    use Uuids;
    use HasSlug;


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tags';


    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['name', 'primary'];


    /**
     * Define dates
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


    /**
     * Define hidden attributes
     * 
     * @var array
     */
    protected $hidden = ['resource_tags_count'];


    /**
     * Define threshold tags
     * need to appear in ResourceTag
     * 
     * @var int
     */
    protected $threshold_resource_tags_count = 5;
    


    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->usingSeparator('-')
            ->doNotGenerateSlugsOnUpdate() // To guarantee that shareable URLs won't change
            ->slugsShouldBeNoLongerThan(50);
    }


    /**
     * Function to check if tag may be in main app
     * Tag may be disabled
     * Tag may have too few linked Resources
     * 
     */
    public function isTagPublic()
    {
        if ($this->disabled)
            return false;

        if (config('app.env') != 'production')
            return true;

        if ($this->resource_tags_count && $this->resource_tags_count > $this->threshold_resource_tags_count)
            return true;
        
        return false;
    }


    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;


    /**
     * The resource_tags that belong to the tag.
     */
    public function resource_tags()
    {
        return $this->hasMany('App\ResourceTag');
    }


    /**
     * Disable a tag
     */
    public function disableTag(){
        $this->disabled = true;
        $this->save();
    }


    /**
     * Enable a tag
     */
    public function enableTag(){
        $this->disabled = false;
        $this->save();
    }


    /**
     * Tag is primary
     */
    public function setTagIsPrimary(){
        $this->primary = true;
        $this->save();
    }


    /**
     * Tag is not primary
     */
    public function setTagIsSecondary(){
        $this->primary = false;
        $this->save();
    }


    /**
     * Function to load main tags for public
     */
    public static function loadMainTags()
    {

        $main_tags = array();
        $tags = Tag::with('resource_tags')->withCount('resource_tags')->get();
        $reconstructed_resources = array();

        foreach ($tags as $tag) {

            if (!$tag->isTagPublic()) 
                continue;

            // Create new tag keys
            if (!array_key_exists($tag->id, $main_tags)) {
                $main_tags[$tag->id] = array(
                    'id'        =>  $tag->id,
                    'name'      =>  $tag->name,
                    'slug'      =>  $tag->slug,
                    'primary'   =>  $tag->primary,
                    'related_weight'   =>  array(),
                );
            }

            // Reconstruct resources with resources_tags attribute
            foreach ($tag->resource_tags as $rt){
                if (array_key_exists($rt->resource_id, $reconstructed_resources)) {
                    array_push($reconstructed_resources[$rt->resource_id], $rt->tag_id);
                } else {
                    $reconstructed_resources[$rt->resource_id] = [$rt->tag_id];
                }

                if ($rt->tag_id !== $tag->id) {
                    
                }
            }
        }

        // Insert into each tag related tags
        foreach (array_keys($reconstructed_resources) as $resource_id){
            foreach($reconstructed_resources[$resource_id] as $tag_id_key){
                foreach($reconstructed_resources[$resource_id] as $tag_id_related){
                    if ($tag_id_key !== $tag_id_related) {
                        if (array_key_exists($tag_id_related, $main_tags[$tag_id_key]['related_weight'])) {
                            $main_tags[$tag_id_key]['related_weight'][$tag_id_related] += 1;
                        } else {
                            $main_tags[$tag_id_key]['related_weight'][$tag_id_related] = 1;
                        }
                    }
                }
            }
        }

        return array_values($main_tags);
    }
}
