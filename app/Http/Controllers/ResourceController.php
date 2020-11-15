<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Services\Cache\CacheManager;
use App\Resource;
use App\ResourceTag;
use App\Tag;
use App\Price;
use App\Type;
use App\Http\Requests\ResourceRequest;
use App\StatResource;

class ResourceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $r = Resource::with('resource_tags', 'price', 'type')->get();
        return response()->json($r, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ResourceRequest $request)
    {

        $r = new Resource();

        try {
            $resource = $r->create($request->all());
            // Save ResourceTag
            $resource->resource_tags()->createMany($request->tags);
        } catch(\Exception $e) {
            abort(500, "Can't save the resource");
        }
        return response()->json(Resource::find($resource->id), 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $r = Resource::findOrFail($id)->with('resource_tags', 'price')->get();
        return response()->json($r, 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ResourceRequest $request, $id)
    {
        $r = Resource::findOrFail($id);

        // Update resource
        try {
            $r->update($request->all());
        } catch(\Exception $e) {
            abort(500, "Can't update the resource");
        }

        // Update resource tags
        try {
            $r->updateResourceTags($request->tags);    
        } catch (\Exception $e) {
            abort(500, "Can't update the resource tags");
        }

        return response()->json($r, 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $r = Resource::findOrFail($id);

        try {
            $resource_tags = ResourceTag::where('resource_id', $r->id)->get();

            foreach ($resource_tags as $rt) {
                $rt->delete();
            }

            $r->delete();
        } catch(\Exception $e) {
            abort(500, "Can't delete the resource");
        }
        return response()->json();
    }


    /**
     * Import array of resource
     */
    public function importResources(Request $request){

        // To DO Vérification

        CacheManager::cleanCache($withImage = true);
        
        foreach ($request->data as $resource) {

            $r = Resource::where('name', $resource['name'])->get()->first();

            if (!$r) {
                $r = new Resource();
            }

            // Create resource entity
            $r->name = $resource['name'];
            $r->description = $resource['description'];
            $r->url = $resource['url'];
            $r->language = $resource['language'];
            $r->score = $resource['score'];
            $r->interface = $resource['interface'];
            
            $price_entity = Price::where('name', $resource['price'])->get()->first();
            if ($price_entity) {
                $r->price_id = $price_entity->id;
            } else {
                $r->price_id = Price::all()->first()->id;
            }

            // To Add when frontend will get type attribute
            $type_entity = Type::where('name', $resource['type'])->get()->first();
            if ($type_entity) {
                $r->type_id = $type_entity->id;
            } else {
                $r->type_id = Type::all()->first()->id;
            }
            $r->save();

            // Create resource tags entity
            $tags = [];
            $resource_tags = explode(",", $resource['tag']);
            foreach ($resource_tags as $resource_tag) {
                $args = explode("|", $resource_tag);
                $tag_name = trim($args[0]," ");
                $tag_score = trim($args[1], " ");
                $t = Tag::withTrashed()->where('name', $tag_name)->get()->first();
                if ($t) {
                    $tag_id = $t->id;
                    $tag = array(
                        "tag_id" => $tag_id,
                        "belonging" =>  $tag_score
                    );
                    array_push($tags, $tag);
                }
            }
            $r->updateResourceTags($tags);    

            // Add image to resource
            $r->uploadImageFromUrlJobCreation($resource);
        }
        return response()->json();
    }

    /**
     * Upload an image
     */

    public function uploadImage(Request $request, $id) {

        // Retrieve Resource from id
        $resource = Resource::findOrFail($id);

        // Remove cache if exists
        CacheManager::removeResourceImageCache($id);

        $file = $request->file('file');
        return $resource->uploadImageFromFile($file);
  }

    public function getImage(Request $r, $id) {

        // Récupération de la ressource
        $resource = Resource::findOrFail($id);

        $resource_image = Cache::remember(
            CacheManager::getCachedObjectName('resources_images', $id),
            CacheManager::getCachedObjectExpiration('resources_images'),
            function () use ($resource) {
                return $resource->getImage();
            });
        
        return $resource_image;
    }


    public function addLike(Request $r, $id)
    {
        $resource = Resource::findOrFail($id);
        $resource->like += 1;
        $resource->save();
        StatResource::launchStatResourceJob($resource->id, 'like');
        return response()->json();
    }

    public function removeLike(Request $r, $id)
    {
        $resource = Resource::findOrFail($id);
        if ($resource->like > 0) {
            $resource->like -= 1;
        }
        $resource->save();
        return response()->json();
    }


    public function addVisit(Request $request, $id)
    {
        $resource = Resource::findOrFail($id);
        $resource->visits += 1;
        $resource->save();
        StatResource::launchStatResourceJob($resource->id, 'visit');
        return response()->json();
    }


}
