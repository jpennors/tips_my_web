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

        // Stats, search tags
        foreach ($tag_ids as $tag_id) {
            StatTag::launchStatTagJob($tag_id, 'search');
        }


        // Retrieve all concerning resources 
        $resource_tags = ResourceTag::with('resource')->whereIn('tag_id', $tag_ids)->get();

        // Return ordered recommendation
        return response()->json([
            "resources" => ResourceTag::getRecommendedResources($resource_tags),
            "tags" => $tags,
        ], 200);
    }

}
