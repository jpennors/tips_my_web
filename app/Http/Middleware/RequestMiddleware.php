<?php

namespace App\Http\Middleware;

use App\Facade\LogCreator as FacadeLogCreator;
use Closure;
use \Illuminate\Http\Request;
use LogCreator;

class RequestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        $token = $request->header("Authorization");

        $response = $next($request);

        FacadeLogCreator::create("Request on ".$request->path(), "info", $request, $token);

        return $response;

    }

}