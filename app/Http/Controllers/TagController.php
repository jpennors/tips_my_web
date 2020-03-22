<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\ResourceTag;
use App\Http\Requests\TagRequest;

class TagController extends Controller
{


    /**
     * Check if parent_id tag does not have a parent itself
     */
    protected function isParentTagIdSecondary($parent_tag_id)
    {
        $parent_tag = Tag::find($parent_tag_id);
        return $parent_tag->parent_id != null;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexPublic(Request $request)
    {
        $tags = Tag::with('parent', 'resource_tags')->withCount('resource_tags')->having('resource_tags_count', '>=', 5)->get();

        return response()->json($tags, 200);
    }


    /**
     * Display a listing of the resource for admin management.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tags = Tag::withTrashed()->with('parent', 'resource_tags')->get();

        return response()->json($tags, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TagRequest $request)
    {

        // Check if the parent tag is not already a secondary tag (meaning it has already itself a parent tag)
        if ($request->parent_id && $this->isParentTagIdSecondary($request->parent_id)) {
            return response()->json(["parent_id" => ["The parent tag is already a secondary tag."]], 422);
        }

        // Instance creation
        $tag = new Tag();

        // Try to save the tag
        try {

            $tag = $tag->create($request->all());

        } catch(\Exception $e) {
            abort(500, "Can't save the resource");
        }

        return response()->json(Tag::find($tag->id), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tag = Tag::findOrFail($id);
        return response()->json($tag, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TagRequest $request, $id)
    {


        // Check if the parent tag is not already a secondary tag (meaning it has already itself a parent tag)
        if ($request->parent_id && $this->isParentTagIdSecondary($request->parent_id)) {
            return response()->json(["parent_id" => ["The parent tag is already a secondary tag."]], 422);
        }

        $tag = Tag::findOrFail($id);

        try {

            $tag->update($request->all());

        } catch(\Exception $e) {
            abort(500, "Can't update the tag");
        }
        return response()->json($tag, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);

        // Try to delete
        try {

            $resource_tags = ResourceTag::where('tag_id', $tag->id)->get();
            foreach ($resource_tags as $rt) {
                $rt->delete();
            }

            $tag->delete();
        } catch(\Exception $e) {
            abort(500, "Can't delete the resource");
        }
        return response()->json();
    }

    public function importTags(Request $request){

        foreach ($request->data as $tag) {

            $t = Tag::withTrashed()->where('name', $tag['name'])->get()->first();

            $parent_tag_id = null;
            if(array_key_exists('parent', $tag)){
                $parent_tag = Tag::withTrashed()->where('name', $tag['parent'])->get()->first();
                if ($parent_tag) {
                    $parent_tag_id = $parent_tag->id;
                }
            }
            $tag['parent_id'] = $parent_tag_id;

            // To DO vérification

            if (!$t) {
                $t = new Tag();
            } else {
                if ($t->deleted_at) {
                    $t->restore();
                }
            }

            $t->name = $tag['name'];
            $t->parent_id = $tag['parent_id'];
            $t->save();
        }

        return response()->json();
    }
}
