<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Resource;
use Carbon\Carbon;

class StatsController extends Controller
{
    

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
