<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Response;
use App\Traits\Uuids;
use App\ResourceTag;
use App\Tag;
use File;
use Storage;

class Resource extends Model
{
    use SoftDeletes;
    use Uuids;


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'resources';


    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['name', 'description', 'url', 'image', 'language', 'score', 'like'];


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
     * The resource_tags that belong to the resource.
     */
    public function resource_tags()
    {
        return $this->hasMany(ResourceTag::class);
    }

    // protected $appends=['tags'];
    // protected $hidden=['resource_tags'];

    public function getTagsAttribute()
    {
        $all_tags = Tag::all()->toArray();
        $tags = [];
        foreach ($this->resource_tags as $resource_tag) {
            $tag_id = $resource_tag->tag_id;
            $tag = array_filter(
                $all_tags,
                function ($t) use (&$tag_id) {
                    return $t['id'] == $tag_id;
                }
            );
            if (array_key_exists(0, $tag)) {
                array_push($tags, $tag[0]);
            }

        }
        return $tags;
    }


    /**
    * Rules pour Validator
    *
    * @var array
    */
    public static $rules = [
        'name'              =>      'required|unique:resources',
        'url'               =>      'required|unique:resources',
        'score'             =>      'required|integer'
    ];


    /**
    *       Mettre à null image
    *
    */
    public function setImageNull(){

        $this->image = null;
        $this->save();

    }


    /**
    *       Mettre à jour image
    *
    */
    public function setImage($fileName){

        $this->image = $fileName;
        $this->save();
    }


    /**
    *       Update de l'image
    *
    */
    public function uploadImage($file){

        if (isset($file)) {

            try {

                // S'il existe une ancienne image, suppresion
                $this->deleteImage();

                $fileName = $this->id.'.'.$file->guessExtension();
                Storage::putFileAs('public/resources/', $file, $fileName);

                $this->setImage($fileName);

            } catch(\Exception $e) {

                abort(500, "Can't save the file");

            }

            return response()->json();

        }

        abort(404, "Image not found");

    }


    /**
    *       Récupération de l'image
    *
    */
    public function getImage(){

        $path = "public/resources/".$this->image;

        try {

            $file = Storage::get($path);
            $type = File::mimeType(storage_path('app/'.$path));
            $response = Response::make($file, 200);
            $response->header("Content-Type", $type);

            return $response;

        } catch(Exception $e){

            abort(500, "Can't find or load the image");

        }
    }


    /**
    *       Suppression de l'image
    *
    */
    public function deleteImage(){

        if ($this->image) {

            $path = 'public/resources/'.$this->picture;

            Storage::delete($path);

            $this->setImageNull();

        }
    }

}
