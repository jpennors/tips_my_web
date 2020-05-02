<?php

use Illuminate\Database\Seeder;
use App\Price;

class PriceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $prices = [
            'Free'                      =>  'free',
            'Freemium'                  =>  'freemium',
            '$'                         =>  'const_1',
            '$$'                        =>  'cost_2',
            '$$$'                       =>  'cost_3',
            'One-time purchase'         =>  'purchase_1',
            'Free + Freemium'           =>  'free_freemium',
            'Free + $'                  =>  'free_cost_1',
            'Free + $$'                 =>  'free_cost_2',
            'Free + $$$'                =>  'free_cost_3',
            'Free + One-time purchase'  =>  'free_purchase_1'
        ];

        foreach($prices as $price_name => $price_slug) {
            $p = new Price();
            $p->name = $price_name;
            $p->slug = $price_slug;
            $p->save();
        }

    }
}
