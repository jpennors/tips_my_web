<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Resource;
use App\Tag;
use App\Http\Requests\ResourceRequest;
use Validator;


class ResourceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $r = Resource::with('resource_tags')->get();
        return response()->json($r, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), Resource::$rules);

        // Mauvaises données, on retourne les erreurs
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

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
        $r = Resource::findOrFail($id)->with('resource_tags')->get();
        return response()->json($r, 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $r = Resource::findOrFail($id);

        try {
            $r->update($request->all());
        } catch(\Exception $e) {
            abort(500, "Can't update the resource");
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

        foreach ($request->data as $resource) {

            $r = Resource::withTrashed()->where('name', $resource['name'])->get()->first();

            if ($r) {
                if($r->deleted_at){
                    $r->restore();
                }
            } else {
                $r = new Resource();
            }

            // To DO vérification

            $r->name = $resource['name'];
            $r->url = $resource['url'];
            $r->language = $resource['language'];
            $r->score = $resource['score'];
            $r->save();

            $tags = [];
            $resource_tags = explode(",", $resource['tag']);
            foreach ($resource_tags as $resource_tag) {
                $args = explode("|", $resource_tag);
                // dd($args);
                // if ($arguments[0] && arguments[1]) {
                    $tag_name = trim($args[0]," ");
                    $tag_score = trim($args[1], " ");
                    // dd($tag_name);
                    $t = Tag::withTrashed()->where('name', $tag_name)->get()->first();
                    if ($t) {
                        $tag_id = $t->id;
                        $tag = array(
                            "tag_id" => $tag_id,
                            "belonging" =>  $tag_score
                        );
                        array_push($tags, $tag);
                    }
                // }

            }
            $r->resource_tags()->createMany($tags);

        }
        return response()->json();
    }

    /**
     * Upload an image
     */

    public function uploadImage(Request $request, $id) {

        // Récupération de la ressource
        $resource = Resource::findOrFail($id);

        if ($resource->image) {
            $resource->deleteImage();
        }

        $file = $request->file('file');
        return $resource->uploadImage($file);
  }

    public function getImage(Request $r, $id) {

        // Récupération de la ressource
        $resource = Resource::findOrFail($id);

        return $resource->getImage();

    }


    public function addLike(Request $r, $id)
    {
        $resource = Resource::findOrFail($id);
        $resource->like += 1;
        $resource->save();
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


}
