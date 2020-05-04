<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ResourceTag;
use App\Resource;
use App\StatTag;
use App\Tag;
use DB;

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

        if (sizeof($search_tags_slugs) == 0) {
            return response()->json(array("error" => "There is no search tag."), 409); 
        }

        // Get associated & ordered tags objects
        $slugs_ordered = implode(',', 
            array_map(function($slug){return '"'.$slug.'"';}, $search_tags_slugs)
        );
        $search_tags = Tag::whereIn('slug', $search_tags_slugs)
            ->where([
                ['disabled', false],
                ['deleted_at', null]
            ])
            ->orderBy(DB::raw('FIELD(slug, '.$slugs_ordered.')'))
            ->get(['id', 'name', 'slug'])
            ->toArray();

        // Retrieve tags id of requested tags
        $tag_ids = array_map(function($t){return $t['id'];}, $search_tags);

        if (sizeof($tag_ids) == 0) {
            return response()->json(array("error" => "There is no valid search tag."), 409); 
        }

        // Split tags into main and related ones
        $main_tag_id = $tag_ids[0];
        array_splice($tag_ids, 0, 1);
        $related_tag_ids = $tag_ids;

        // Stats, search tags
        foreach ($tag_ids as $tag_id) {
            StatTag::launchStatTagJob($tag_id, 'search');
        }

        // Retrieve all concerning resources by search
        $resources = Resource::with('resource_tags', 'price')
            ->whereHas('resource_tags', function($q) use ($main_tag_id){
                $q->where('tag_id', $main_tag_id);
            })
            ->whereHas('resource_tags', function($q) use ($related_tag_ids){
                if (sizeof($related_tag_ids) > 0) {
                    $q->whereIn('tag_id', $related_tag_ids);
                }
            })
            ->get()
            ->toArray();

        // Return ordered recommendation
        return response()->json([
            "resources" => ResourceTag::getRecommendedResources($resources, $main_tag_id, $related_tag_ids),
            "tags" => $search_tags,
        ], 200);
    }

}
