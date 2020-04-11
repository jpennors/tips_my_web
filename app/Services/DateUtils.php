<?php

namespace App\Services;

use Illuminate\Support\Carbon;

class DateUtils
{


    /**
     * Get data structure to
     * retrieve stats about visitors
     * 
     */
    public static function getVisitsDateRange($start_date, $end_date){

        $date_range = DateUtils::getDateRange($start_date, $end_date);
        $visits_date_range = array();

        foreach ($date_range as $date) {
            $visits_date_range[$date] = array(
                    "formatted_date" => Carbon::createFromFormat('Y-m-d', $date)->format('d/m'),
                    "visitors"  => 0
            );     
        }

        return $visits_date_range;
    }


    /**
     * Get date range between two dates
     * 
     */
    public static function getDateRange($start_date, $end_date){
        
        $start_date = Carbon::createFromFormat('Y-m-d', $start_date);
        $end_date = Carbon::createFromFormat('Y-m-d', $end_date);
        $dates = array();

        for($date = $start_date; $date->lte($end_date); $date->addDay()) {
            array_push($dates, $date->format('Y-m-d'));
        }
        
        return $dates;
    }
}