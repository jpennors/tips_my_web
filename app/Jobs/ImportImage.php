<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Tag;

class ImportImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $tag;
    protected $provided_resource;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($provided_resource, $tag)
    {
        $this->tag = $tag;
        $this->provided_resource = $provided_resource;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->tag->uploadImageFromUrl($this->provided_resource);
    }
}
