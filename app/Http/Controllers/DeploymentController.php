<?php

namespace App\Http\Controllers;

use Artisan;
use Illuminate\Http\Request;

class DeploymentController extends Controller
{

    public function DatabaseMigrationCommand(Request $request)
    {
        Artisan::call('migrate');
        return response()->json();
    }

    public function DatabaseSeedingCommand(Request $request)
    {
        Artisan::call('db:seed');
        return response()->json();
    }

    public function CacheClearCommand(Request $request)
    {
        Artisan::call('cache:clear');
        return response()->json();
    }

    public function ConfigClearCommand(Request $request)
    {
        Artisan::call('config:clear');
        return response()->json();
    }

}
