<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Resource;
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
            $r->delete();
        } catch(\Exception $e) {
            abort(500, "Can't delete the resource");
        }
        return response()->json();
    }

}
