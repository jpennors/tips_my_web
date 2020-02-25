<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ResourceTag;
use App\Resource;
use App\Tag;

class ResourceTagController extends Controller
{

    /**
     * Function to search resources based on requested tags
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $search_tags_slugs = $request->tags;
        $search_size = sizeof($search_tags_slugs);
        $search_results = array();

        foreach ($search_tags_slugs as $tag_slug) {
            $tag = Tag::where('slug', $tag_slug)->firstOrFail();
            $resource_tags = ResourceTag::with('resource')->where('tag_id', $tag["id"])->get();
            foreach ($resource_tags as $resource_tag) {

                $index = array_search($resource_tag->resource['id'], array_column($search_results, 'id'));

                // If resource not found in the search_results, add it with a search_score
                // If not, sum the search_score
                if($index === FALSE){
                    // Get resource with price
                    $resource = Resource::findOrFail($resource_tag->resource['id'])->with('price')->get()[0];

                    $resource["search_score"] = $resource_tag->belonging/$search_size;
                    array_push($search_results, $resource);
                } else {
                    $search_results[$index]["search_score"] += $resource_tag->belonging/$search_size;
                }
            }
        }

        // Sort the search_results by search_score value (descending)
        usort($search_results,function($first,$second){
            return $first["search_score"] < $second["search_score"];
        });

        return response()->json($search_results);
    }

}
