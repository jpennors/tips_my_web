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


    protected $hidden = ['resource_tags_count'];


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
}
