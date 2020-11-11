<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\ResourceTag;
use App\Http\Requests\TagRequest;

class TagController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexPublic(Request $request)
    {
        dd($request);
        $tags = Tag::loadMainTags();

        return response()->json($tags, 200);
    }


    /**
     * Display a listing of the resource for admin management.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tags = Tag::withTrashed()->with('resource_tags')->get();

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

            // To DO vérification

            if (!$t) {
                $t = new Tag();
            } else {
                if ($t->deleted_at) {
                    $t->restore();
                }
            }

            $t->name = $tag['name'];
            if (array_key_exists('primary',$tag)) {
                $t->primary = $tag['primary'];
            }
            $t->save();
        }

        return response()->json();
    }


    public function disableTag(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->disableTag();

        return response()->json();
    }


    public function enableTag(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->enableTag();

        return response()->json($tag, 200);
    }


    public function tagIsPrimary(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->setTagIsPrimary();

        return response()->json();
    }


    public function tagIsSecondary(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->setTagIsSecondary();

        return response()->json();
    }

    
    public function restoreTag(Request $request, $id)
    {
        $tag = Tag::onlyTrashed()->findOrFail($id);
        $tag->restore();

        return response()->json($tag, 200);
    }
}
