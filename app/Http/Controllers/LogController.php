<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Log;
use Carbon\Carbon;

class LogController extends Controller
{
    

    public function getVisitorNumberByDay(Request $request)
    {
        
        // Date formate Y-m-d
        $start_date = $request->start_date;
        $end_date = $request->end_date;

        $visitors = DB::table('logs')
            ->select('created_date', DB::raw('COUNT(DISTINCT(hashed_ip)) as visitor'))
            ->where([
                ['created_date', '>=', $start_date],
                ['created_date', '<=', $end_date]
            ])
            ->groupBy('created_date')
            ->get();

        return response()->json($visitors, 200);
    }


    public function getLogs(Request $request)
    {

        // Date formate Y-m-d
        $date = $request->date;

        $logs = Log::where("created_date", $date)->get();
        return response()->json($logs, 200);

    }


    public function getCurrentVisitor(Request $request)
    {

        $current_date = Carbon::now()->format('Y-m-d');

        $visitors = DB::table('logs')
            ->select(DB::raw('COUNT(DISTINCT(hashed_ip)) as visitor'))
            ->where('created_date', $current_date)
            ->get();

        return response()->json($visitors, 200);
        
    }

}
