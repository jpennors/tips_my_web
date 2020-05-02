<?php

use Illuminate\Database\Seeder;
use App\Price;
use App\Type;
use App\Resource;
use App\ResourceTag;
use App\Tag;

class ResourceTagTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        if (config('app.env') === 'development') {
            
            $resources = [
                array(
                    'name'  => 'Vexel',
                    'description'  => 'Download Royalty-free Commercial Use Vector Graphics and Images. 
                        Trendy vectors and more. Commercial License Vector. Download Vector, PNG, SVG. 
                        Royalty Free Vectors.',
                    'url'   =>  'https://www.vexels.com/',
                    'language'  =>  'fr',
                    'score'     =>  10,
                    'price_id'  => Price::first()->id,
                    'type_id'   => Type::first()->id,
                    'tags'  => [
                        'communication',
                        'graphisme',
                        'web'
                    ],
                ),
                array(
                    'name'  => 'unDraw',
                    'description'  => 'Download Royalty-free Commercial Use Vector Graphics and Images. 
                        Trendy vectors and more. Commercial License Vector. Download Vector, PNG, SVG. 
                        Royalty Free Vectors.',
                    'url'   =>  'https://www.vexels.com/',
                    'language'  =>  'fr',
                    'score'     =>  10,
                    'price_id'  => Price::first()->id,
                    'type_id'   => Type::first()->id,
                    'tags'  => [
                        'ui',
                        'graphisme',
                    ],
                ),
                array(
                    'name'  => 'Pexel',
                    'description'  => 'Download Royalty-free Commercial Use Vector Graphics and Images. 
                        Trendy vectors and more. Commercial License Vector. Download Vector, PNG, SVG. 
                        Royalty Free Vectors.',
                    'url'   =>  'https://www.vexels.com/',
                    'language'  =>  'fr',
                    'score'     =>  10,
                    'price_id'  => Price::first()->id,
                    'type_id'   => Type::first()->id,
                    'tags'  => [
                        'ux',
                        'graphisme',
                    ],
                ),
                array(
                    'name'  => 'Canva',
                    'description'  => 'Download Royalty-free Commercial Use Vector Graphics and Images. 
                        Trendy vectors and more. Commercial License Vector. Download Vector, PNG, SVG. 
                        Royalty Free Vectors.',
                    'url'   =>  'https://www.vexels.com/',
                    'language'  =>  'fr',
                    'score'     =>  10,
                    'price_id'  => Price::first()->id,
                    'type_id'   => Type::first()->id,
                    'tags'  => [
                        'web',
                        'canva',
                        'graphisme',
                    ],
                ),
                array(
                    'name'  => 'Unsplash',
                    'description'  => 'Download Royalty-free Commercial Use Vector Graphics and Images. 
                        Trendy vectors and more. Commercial License Vector. Download Vector, PNG, SVG. 
                        Royalty Free Vectors.',
                    'url'   =>  'https://www.vexels.com/',
                    'language'  =>  'fr',
                    'score'     =>  10,
                    'price_id'  => Price::first()->id,
                    'type_id'   => Type::first()->id,
                    'tags'  => [
                        'graphisme',
                        'photo'
                    ],
                ),
                array(
                    'name'  => 'Coolors',
                    'description'  => 'Download Royalty-free Commercial Use Vector Graphics and Images. 
                        Trendy vectors and more. Commercial License Vector. Download Vector, PNG, SVG. 
                        Royalty Free Vectors.',
                    'url'   =>  'https://www.vexels.com/',
                    'language'  =>  'fr',
                    'score'     =>  10,
                    'price_id'  => Price::first()->id,
                    'type_id'   => Type::first()->id,
                    'tags'  => [
                        'web',
                        'graphisme',
                        'color'
                    ],
                ),
                        
            ];

            foreach ($resources as $resource) {
                $tags = $resource['tags'];
                unset($resource['tags']);
                $r = Resource::create($resource);
                foreach($tags as $tag_name){
                    $tag = Tag::firstOrCreate(['name' => $tag_name]);
                    $rt = new ResourceTag();
                    $rt->tag_id = $tag['id'];
                    $rt->resource_id = $r->id;
                    $rt->save();
                }
            }

            // To do 
            // After Tag rebase, add primary attribute to tags here

            $primary_tags = [

            ];

            foreach($primary_tags as $tag_name){
                $tag = Tag::firstOrCreate(['name' => $tag_name]);
                // Primary attribute to add
                $tag->save();
            }

        }

    }
}
