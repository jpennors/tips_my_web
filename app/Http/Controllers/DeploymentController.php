<?php

namespace App\Http\Controllers;

use Artisan;
use Illuminate\Http\Request;

class DeploymentController extends Controller
{

    public function DependenciesInstallationCommand(Request $request)
    {
        try {
            $command = "composer install";
            // $command = "php composer.phar install"; 
            $path = base_path();
            exec("cd {$path} && {$command}");
        } catch(\Exception $e) {
            abort(500, $e);
        }
        return response()->json();
    }


    public function DatabaseMigrationCommand(Request $request)
    {
        try {
            Artisan::call('migrate');
        } catch(\Exception $e) {
            abort(500, $e);
        }
        return response()->json();
    }

    public function DatabaseSeedingCommand(Request $request)
    {
        try {
            Artisan::call('db:seed');
        } catch(\Exception $e) {
            abort(500, $e);
        }
        return response()->json();
    }

    public function CacheClearCommand(Request $request)
    {
        try {
            Artisan::call('cache:clear');
        } catch(\Exception $e) {
            abort(500, $e);
        }
        return response()->json();
    }

    public function ConfigClearCommand(Request $request)
    {
        try {
            Artisan::call('config:clear');
        } catch(\Exception $e) {
            abort(500, $e);
        }
        return response()->json();
    }

}
