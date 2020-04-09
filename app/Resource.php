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
    protected $fillable = ['name', 'description', 'url', 'image', 'language', 'score', 'price_id', 'type_id', 'interface', 'like'];


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
     * The price relationship
     */
    public function price(){
        return $this->belongsTo('App\Price');
    }


    /**
     * The price relationship
     */
    public function type(){
        return $this->belongsTo('App\Type');
    }


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


    /**
     * Update resource tags of a resource
     * Remove, update or create resource tags
     * depending on existing one and tags provided
     */
    public function updateResourceTags($tags){

        $old_resource_tags = ResourceTag::where('resource_id', $this->id)->get();
        $new_resource_tags = $tags;
        foreach ($old_resource_tags  as $rt) {
            $index = array_search($rt->tag_id, array_column($new_resource_tags, 'tag_id'));
            if ($index === FALSE) {
                $rt->delete();
            } else {
                $rt->update($new_resource_tags[$index]);
            }
        }
        foreach ($new_resource_tags as $rt) {
            $index = array_search($rt['tag_id'], array_column($old_resource_tags->toArray(), 'tag_id'));

            if ($index === FALSE) {
                $new_rt = new ResourceTag();
                $new_rt->tag_id = $rt['tag_id'];
                $new_rt->resource_id = $this->id;
                $new_rt->belonging = $rt['belonging'];
                $new_rt->save();
            }
        }        
    }
}
