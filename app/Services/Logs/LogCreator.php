<?php

namespace App\Services\Logs;

use App\AdminToken;
use App\LogRoute;
use App\LogGeoip;
use Illuminate\Support\Facades\Hash;
use Log;
use \Illuminate\Http\Request;
use \Torann\GeoIP\Facades\GeoIP;

class LogCreator
{


    /**
     * Handle Log Creation
     */
    public function create($message, $level, $context)
    {      
       \Log::channel('custom')->$level($message, $context);
    }


    /**
     * Retrieve ip adress from request 
     */
    protected function getIpAdress($request)
    {
        if (!$request) {
            return null;
        }
        return hash("sha256", $request->ip());
        // return Hash::make($request->ip());
    }


    /**
     * Retrieve AdminToken_id from token
     */
    protected function getAdminTokenId($token = null)
    {
        if (!$token) {
            return null;
        }

        $row = AdminToken::where('token', $token)->get()->first();
        if ($row != null) {
            return $row->id;
        }

        return null;
    }

    
    /**
     * Retrieve route_id from request
     */
    protected function getLogRouteId($request)
    {
        if (!$request) {
            return null;
        }

        $route_info = $request->route();

        if (!$route_info) {
            return null;
        }

        $uri = $route_info->uri;
        $method = join(",", $route_info->methods);
        $controller = $route_info->controller;

        $log_route = LogRoute::firstOrCreate([
            'uri'       => $uri,
            'method'    => $method,
            'controller'=> null
        ],[]);

        return $log_route->id;
    }


    public function getLogGeoipId($request)
    {
        if (!$request) {
            return null;
        }

        if ($_SERVER['REMOTE_ADDR'] == env('PROXY_IP_ADDRESS')) {
            $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip_address = $_SERVER['REMOTE_ADDR'];
        }
        dd($ip_address);

        $geoip = geoip($ip_address);
        $log_geoip = LogGeoip::firstOrCreate([
            'continent'   => $geoip['continent'],
            'timezone'    => $geoip['timezone'],
            'country'     => $geoip['country'],
            'state_name'  => $geoip['state_name'],
            'city'        => $geoip['city'] 
        ],[]);
        dd($log_geoip);

        return $log_geoip->id;
    }


    protected $routes_to_ignore = [
        "api/import/tags",
        "api/login",
        "api/import/resources"
    ];


    public function getJsonParameters($request)
    {
        $uri = null;
        $route_info = $request->route();
        if ($route_info) {
            $uri = $route_info->uri;
        }

        if ($uri && array_search($uri, $this->routes_to_ignore) === FALSE) {
            return json_encode($request->all());
        }

        return null;
    }


    public function serializeLog(Request $request = null, string $token = null)
    {
        return [
            "hashed_ip" => $this->getIpAdress($request),
            "geoip_id"  => $this->getLogGeoipId($request),
            "route_id"  => $this->getLogRouteId($request),            
            "token_id"  => $this->getAdminTokenId($token),
            "parameters"=> $this->getJsonParameters($request),
        ];
    }

}