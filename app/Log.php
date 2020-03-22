<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
    protected $fillable = ['description', 'level', 'created_date', 'hashed_ip', 'route_id', 'geoip_id', 'token_id'];


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

}
