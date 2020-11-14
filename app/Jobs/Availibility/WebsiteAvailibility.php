<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Resource;
use App\Services\MailSender;

class StatResourceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $resources;
    protected $unaivalaible_resources;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->resources = Resource::all();
        $this->unaivalaible_resources = array();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->resources as $resource) {
            $this->checkWebsiteAvailibility($resource);
        }
    }

    /**
     * Check if the resource website is available
     * 
     */
    protected function checkWebsiteAvailibility(Resource $resource)
    {
        $timeout = 10;
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_URL, $resource->url);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_TIMEOUT, $timeout);
        $http_response = curl_exec($ch);
        curl_close($ch);
        $http_response = trim(strip_tags($http_response));
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if (($http_code != "200") && ($http_code != "302")) {
            $this->unaivalaible_resources = array_push(
                $this->unaivalaible_resources,
                array([
                    'resource'  => $resource,
                    'http_code' => $http_code 
                ]));
        }
    }

    /**
     * Send email alert if needed
     * 
     */
    protected function sendEmailAlert()
    {
        if (count($this->unaivalaible_resources) > 0) {
            MailSender::send_resource_website_alert($this->unaivalaible_resources);
        }
    }
}
