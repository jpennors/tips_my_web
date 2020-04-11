<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Log;
use Carbon\Carbon;
use App\Services\DateUtils;

class LogController extends Controller
{
    

    public function getVisitorNumberByDay(Request $request)
    {
        
        // Date formate Y-m-d
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $visits_date_range = DateUtils::getVisitsDateRange($start_date, $end_date);

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


    public function getLogs(Request $request)
    {

        // Date formate Y-m-d
        $date = $request->date;

        $logs = Log::where("created_date", $date)->with('route', 'geoip')->get();
        return response()->json($logs, 200);

    }


    public function getCurrentVisitor(Request $request)
    {

        $current_date = Carbon::now()->format('Y-m-d');

        $visitors = DB::table('logs')
            ->select(DB::raw('COUNT(DISTINCT(hashed_ip)) as visitors'))
            ->where('created_date', $current_date)
            ->get()->first();

        return response()->json($visitors, 200);
        
    }

}
