<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Resource;
use Carbon\Carbon;
use DB;
use App\StatTag;

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


    public function getTopResources()
    {

        $top_resources_all_time = array();
        
        $top_resources_all_time["visits"] = Resource::orderBy('visits', 'DESC')
            ->take(10)
            ->get();
    
        $top_resources_all_time["like"] = Resource::orderBy('like', 'DESC')
            ->take(10)
            ->get();

        return response()->json($top_resources_all_time, 200);
    }

}
