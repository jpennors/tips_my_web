<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Uuids;

class Tag extends Model
{
    use SoftDeletes;
    use Uuids;


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

    /**
    * Rules pour Validator
    *
    * @var array
    */
    public static $rules = [
        'name'              =>      'required',
        // 'parent_id'         =>      'exists:tags'
    ];

}
