<?php

namespace App\Services;

use Illuminate\Support\Carbon;

class DateUtils
{


    
    /**
     * Get date range between two dates
     * 
     */
    public static function getDateRange($start_date, $end_date){
        
        $start_date = Carbon::createFromFormat('Y-m-d', $start_date);
        $end_date = Carbon::createFromFormat('Y-m-d', $end_date);
        $dates = array();

        for($date = $start_date; $date->lte($end_date); $date->addDay()) {

            $dates[$date->format('Y-m-d')] = array(
                    "formatted_date" => $date->format('m-d'),
                    "visitors"  => 0
            );    
        }
        
        return $dates;
    }
}