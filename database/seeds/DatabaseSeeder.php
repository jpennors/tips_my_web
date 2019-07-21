<?php

use Illuminate\Database\Seeder;
use App\Price;
use App\Type;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        // Price Seeder

        $p = new Price();
        $p->name = "Free";
        $p->slug = "free";
        $p->save();

        $p = new Price();
        $p->name = "Freemium";
        $p->slug = "freemium";
        $p->save();

        $p = new Price();
        $p->name = "$";
        $p->slug = "cost_1";
        $p->save();
        
        $p = new Price();
        $p->name = "$$";
        $p->slug = "cost_2";
        $p->save();

        $p = new Price();
        $p->name = "$$$";
        $p->slug = "cost_3";
        $p->save();

        $p = new Price();
        $p->name = "One-time purchase";
        $p->slug = "purchase_1";
        $p->save();

        $p = new Price();
        $p->name = "Free + Freemium";
        $p->slug = "free_freemium";
        $p->save();

        $p = new Price();
        $p->name = "Free + $";
        $p->slug = "free_cost_1";
        $p->save();

        $p = new Price();
        $p->name = "Free + $$";
        $p->slug = "free_cost_2";
        $p->save();

        $p = new Price();
        $p->name = "Free + $$$";
        $p->slug = "free_cost_3";
        $p->save();

        $p = new Price();
        $p->name = "Free + One-time purchase";
        $p->slug = "free_purchase_1";
        $p->save();


        // Type Seeder

        $t = new Type();
        $t->name = "website";
        $t->save();

    }
}
