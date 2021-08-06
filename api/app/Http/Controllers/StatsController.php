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
 
    #region Tags
    public function countSearchTags(Request $request)
    {
        // Date formate Y-m-d
        $start_date = $request->start_date;
        $end_date = $request->end_date;

        $search_tag_count = StatTag::getMostRecurrentTagsByAction($start_date, $end_date, 'search');

        return response()->json($search_tag_count, 200);
    }
    #endregion


    #region Resources
    public function getTopTrendyResources(Request $request)
    {
        // Date formate Y-m-d
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $quantity = 10;
        if ($request->get('quantity')) {
            $quantity = $request->get('quantity');
        }

        $trendy_resources = array(
            'like' => StatResource::getMostRecurrentResourcesByAction($start_date, $end_date, 'like', $quantity),
            'visit' => StatResource::getMostRecurrentResourcesByAction($start_date, $end_date, 'visit', $quantity)
        );
        
        return response()->json($trendy_resources, 200);
    }


    public function getTopAllTimeResources(Request $request)
    {
        $quantity = 10;
        if ($request->get('quantity')) {
            $quantity = $request->get('quantity');
        }
        $top_resources_all_time = array();
        
        $top_resources_all_time["visits"] = Resource::orderBy('visits', 'DESC')
            ->take($quantity)
            ->get();
    
        $top_resources_all_time["like"] = Resource::orderBy('like', 'DESC')
            ->take($quantity)
            ->get();

        return response()->json($top_resources_all_time, 200);
    }
    #endregion


    #region Visitors
    public function getCurrentDayVisitor()
    {
        $visitors = DB::table('logs')
            ->where('created_date', DateUtils::getCurrentDate())
            ->distinct()
            ->count('hashed_ip');

        return response()->json(['visitors' => $visitors], 200);
    }

    public function getVisitorNumberByDay(Request $request)
    {
        // Date formate Y-m-d
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $visits_date_range = DateUtils::getCustomDataRange($start_date, $end_date, array(
            "visitors" => 0
        ));

        $visitors_stat = DB::table('logs')
            ->select('created_date', DB::raw('COUNT(DISTINCT(hashed_ip)) as visitors'))
            ->where([
                ['created_date', '>=', $start_date],
                ['created_date', '<=', $end_date]
            ])
            ->groupBy('created_date')
            ->get();

        foreach ($visitors_stat as $stat) {
            if (array_key_exists($stat->created_date, $visits_date_range)) {
                $visits_date_range[$stat->created_date]["visitors"] = $stat->visitors;
            }
        }

        return response()->json(array_values($visits_date_range), 200);
    }
    #endregion
}
