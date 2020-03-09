<?php

namespace App\Services\Logs;

use App\AdminToken;
use App\LogRoute;
use Log;

class LogCreator
{


    /**
     * Handle Log Creation
     */
    public function create($message, $level, $request = null, $token = null)
    {        
        $context = [
            "hashed_ip" => $this->getIpAdress($request),
            "geoip_id"  => null,
            "route_id"  => $this->getLogRouteId($request),            
            "token_id"  => $this->getAdminTokenId($token),
        ];

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

        return $request->ip();
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
}