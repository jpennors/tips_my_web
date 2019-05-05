<?php

namespace App\Http\Middleware;

use Closure;
use App\Log;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->header("Authorization"))
        {

            $token = $request->header("Authorization");
            $log = Log::where('token', $token)->get();
            if($log->first()) {
                $log = $log->first();
                $validity_hours = config('auth.admin.validity_hours');
                if((time() - $log->created_at->timestamp < $validity_hours*60*60) && !$log->disabled) {
                    return $next($request);
                } else {
                    \Log::info("401, unauthorized, token expired");
                    return response()->json(array("error" => "token expired"));
                }
            }
            else {
                \Log::info("401, unauthorized, token not recognized");
                return response()->json(array("error" => "token not recognized"));
            }
        }
        else {
            \Log::info("401, unauthorized, token not provided");
            return response()->json(array("error" => "token not provided"));
        }
    }
}
