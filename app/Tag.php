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
    protected $fillable = ['name', 'parent_id'];


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
     * The parent tag id
     */
    public function parent(){
        return $this->belongsTo('App\Tag', 'parent_id');
    }

}
