<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Response;
use App\Traits\Uuids;
use App\ResourceTag;
use App\Tag;
use App\Jobs\ImportImage;
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
    *  Update image
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
     * Create job to upload image 
     * 
     */
    public function uploadImageFromUrlJobCreation($provided_resource)
    {
        ImportImage::dispatch($provided_resource, $this);
    }
    



    /**
     * Upload new image after importing resource
     * 
     */
    public function uploadImageFromUrl($provided_resource)
    {
        $new_image = null;

        // Image attribute is a link of image
        if (array_key_exists('image', $provided_resource) && $provided_resource['image']) {

            try {

                $new_image = file_get_contents($provided_resource['image']);
                $filename = $this->id.".png";

            } catch (\Throwable $th){}

        } 

        // Search in website source code
        else if (array_key_exists('url', $provided_resource) && $provided_resource['url'])
        {
            try {

                // Retrieve image
                $html = file_get_contents($provided_resource['url']);
                
                // Research meta property in source code to get image
                $img_meta_property = "og:image";
                
                if (($pos = strpos($html, $img_meta_property)) !== FALSE) {
                    // If property found, try to get content of it
                    $html = substr($html, $pos);
                    $img_meta_property_attribute = "content=";
                    if (($pos = strpos($html, "content=")) !== FALSE) {

                        $html = substr($html, $pos + strlen($img_meta_property_attribute) + 1);
                        $pos = strpos($html, " ");
                        $image_url = substr($html, 0, $pos - 1);
                        $filename = basename($image_url);
                        $new_image = file_get_contents($image_url);
                    }
                }

            } catch (\Throwable $th) {}
        }

        if ($new_image) {

            try {

                // Add new one in Storage
                Storage::put("public/resources/".$filename, $new_image);

                // Delete existing one if exists
                $this->deleteImage();
                
                // Save new filename
                $this->setImage($filename);

            } catch (\Throwable $th) {}
        }
    }


    /**
    *  Retrieve image
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
    *  Remove image
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
