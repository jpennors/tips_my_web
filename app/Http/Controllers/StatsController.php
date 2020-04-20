<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Resource;
use App\Services\DateUtils;
use DB;
use App\StatTag;
use App\StatResource;

class StatsController extends Controller
{
    
    public function CountSearchTags(Request $request)
    {
        // Date formate Y-m-d
        $start_date = $request->start_date;
        $end_date = $request->end_date;

        $search_tag_count = StatTag::getMostRecurrentTagsByAction($start_date, $end_date, 'search');

        return response()->json($search_tag_count, 200);
    }


    public function GetTopTrendyResources(Request $request)
    {
        // Date formate Y-m-d
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $quantity = 10;

        $trendy_resources = array(
            'like' => StatResource::getMostRecurrentResourcesByAction($start_date, $end_date, 'like', $quantity),
            'visit' => StatResource::getMostRecurrentResourcesByAction($start_date, $end_date, 'visit', $quantity)
        );
        
        return response()->json($trendy_resources, 200);
    }


    public function GetTopAllTimeResources()
    {
        $quantity = 10;
        $top_resources_all_time = array();
        
        $top_resources_all_time["visits"] = Resource::orderBy('visits', 'DESC')
            ->take($quantity)
            ->get();
    
        $top_resources_all_time["like"] = Resource::orderBy('like', 'DESC')
            ->take($quantity)
            ->get();

        return response()->json($top_resources_all_time, 200);
    }

}
