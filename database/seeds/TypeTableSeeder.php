<?php

use Illuminate\Database\Seeder;
use App\Type;

class TypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $types = [
            'website',
            'software',
            'application',
            'account',
            'video',
            'company'
        ];

        foreach($types as $type_name)
        {
            $t = new Type();
            $t->name = $type_name;
            $t->save();
        }        

    }
}
