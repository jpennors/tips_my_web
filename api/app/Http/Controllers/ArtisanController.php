<?php

namespace App\Http\Controllers;

use Artisan;
use Illuminate\Http\Request;

class ArtisanController extends Controller
{

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

    public function QueueWorkCommand(Request $request)
    {
        $command = 'queue:work';

        if($request->get('options') && $request->get('options') == 'empty')
            $command .= ' --stop-when-empty';

        Artisan::call($command);
        return response()->json();
    }

}
