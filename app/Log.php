<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Log extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'logs';


    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['description', 'level', 'created_date', 'hashed_ip', 'route_id', 'geoip_id', 'token_id', 'parameters'];


    /**
     * Attributes to hide
     */
    protected $hidden = ['hashed_ip', 'geoip_id', 'token_id', 'route_id'];


    /**
     * Route relationship
     */
    public function route(){
        return $this->belongsTo('App\LogRoute');
    }


    /**
     * Route relationship
     */
    public function geoip(){
        return $this->belongsTo('App\LogGeoip');
    }

    public static function getStatsVisitors($start_date, $end_date)
    {
        $new_visitors = DB::table('logs')
            ->groupBy('hashed_ip')
            ->select('created_date')
            ->havingRaw('min(created_date) >= \''.$start_date.'\' and min(created_date) <= \''.$end_date.'\'')
            ->get();

        $visitors_stat = array();

       foreach ($new_visitors as $new_visitor)
       {
           $created_date = $new_visitor->created_date;
           if (!array_key_exists($created_date, $visitors_stat))
               $visitors_stat[$created_date] = array(
                   'new_visitors_count' => 0,
                   'visitors_count' => 0,
                   'date' => $created_date
               );

           $visitors_stat[$created_date]['new_visitors_count'] += 1;
       }

        $visitors = DB::table('logs')
           ->where([
               ['created_date', '>=', $start_date],
               ['created_date', '<=', $end_date]])
           ->select('created_date', DB::raw('count(distinct(hashed_ip)) as count'))
           ->groupBy('created_date')
           ->get();
       
        foreach ($visitors as $visitor)
        {
            $created_date = $visitor->created_date;
            if (!array_key_exists($created_date, $visitors_stat))
                $visitors_stat[$created_date] = array(
                    'new_visitors_count' => 0,
                    'visitors_count' => 0,
                    'date' => $created_date
                );

            $visitors_stat[$created_date]['visitors_count'] += $visitor->count;
        }

        return array_values($visitors_stat);
    }

}
