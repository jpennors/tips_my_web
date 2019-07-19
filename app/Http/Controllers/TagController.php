<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\ResourceTag;
use Validator;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd();

        $only = $request->input('only', null);
        if ($only == "parent") {
            $tag = Tag::all()->where('parent_id', '<>', null)->with('parent')->get();
            // $tag = Tag::where('parent_id', '<>', null)->with('parent_id', 'resource_tags')->get();
        } else if ($only == "child") {
            $tag = Tag::with('parent', 'resource_tags')->get();
        } else {
            $tag = Tag::with('parent', 'resource_tags')->get();
        }

        // $tag = Tag::all();

        // $tag = Tag::with('resource_tags')->get();
        // $tag = Tag::where('parent_id', null)->with('resource_tags')->get();
        return response()->json($tag, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), Tag::$rules);

        // Mauvaises données, on retourne les erreurs
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
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
    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        try {

            $tag->update($request->all());

        } catch(\Exception $e) {
            dd($e);
            abort(500, "Can't update the resource");
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
