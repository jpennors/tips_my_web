<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ResourceTag;
use App\Resource;
use App\StatTag;
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
        // Retrieve tags id of requested tags
        $search_tags_slugs = $request->tags;
        $tag_ids = Tag::whereIn('slug', $search_tags_slugs)
            ->pluck('id')
            ->toArray();
        
        // Stats, search tags
        foreach ($tag_ids as $tag_id) {
            StatTag::launchStatTagJob($tag_id, 'search');
        }

        // Get associated tags names
        $tags = Tag::whereIn('slug', $search_tags_slugs)
            ->get();

        // Retrieve all concerning resources 
        $resource_tags = ResourceTag::with('resource')->whereIn('tag_id', $tag_ids)->get();

        // Return ordered recommendation
        return response()->json([
            "resources" => ResourceTag::getRecommendedResources($resource_tags),
            "tags" => $tags,
        ], 200);
    }

}
