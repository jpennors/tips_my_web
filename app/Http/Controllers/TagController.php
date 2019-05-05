<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $tag = Tag::All();
        $tag = Tag::with('resource_tags')->get();
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
            $tag->delete();
        } catch(\Exception $e) {
            abort(500, "Can't delete the resource");
        }
        return response()->json();
    }
}
