<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Resource;
use App\Tag;
use App\Price;
use App\Type;
use App\Suggestion;
use App\Contact;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource found with the key.
     *
     * @return \Illuminate\Http\Response
     */
    public function adminGeneralSearch(Request $request)
    {
        // Retrieve key to launch search
        $key = $request->key;
        $sql_search_key = '%'.$key.'%';

        // Search for results in Resources
        $resources = Resource::select('id', 'name')
        ->where(
            'name', 'LIKE', $sql_search_key
        )

        ->orWhere(
            'url', 'LIKE', $sql_search_key
        )
        ->get();

        // Search for results in Tags
        $tags = Tag::select('id', 'name')
        ->where(
            'name', 'LIKE', $sql_search_key
        )
        ->orWhere(
            'slug', 'LIKE', $sql_search_key
        )
        ->get();

        // Search for results in Prices
        $prices = Price::select('id', 'name')
        ->where(
            'name', 'LIKE', $sql_search_key
        )
        ->orWhere(
            'slug', 'LIKE', $sql_search_key
        )
        ->get();

        // Search for results in Types
        $types = Type::select('id', 'name')
        ->where(
            'name', 'LIKE', $sql_search_key
        )
        ->get();

        // Search for results in Suggestions
        $suggestions = Suggestion::where(
                'description', 'LIKE', $sql_search_key
            )
            ->orWhere(
                'url', 'LIKE', $sql_search_key
            )
            ->get();

        // Search for results in Contacts
        $contacts = Contact::where(
            'email', 'LIKE', $sql_search_key
        )
        ->orWhere(
            'message', 'LIKE', $sql_search_key
        )
        ->get();

        $results = array(
            $this->formateAdminSearchResult('resources', 'Resources', $resources),
            $this->formateAdminSearchResult('tags', 'Tags', $tags),
            $this->formateAdminSearchResult('prices', 'Prices', $prices),
            $this->formateAdminSearchResult('types', 'Types', $types),
            $this->formateAdminSearchResult('suggestions', 'Suggestions', $suggestions),
            $this->formateAdminSearchResult('contacts', 'Contacts', $contacts)
        );

        return response()->json($results, 200);
    }


    /**
     * Formate Result for GeneralAdminSeacrch
     * 
     */
    protected function formateAdminSearchResult($name, $slug, $results)
    {
        return array(
            'name'      =>  $name,
            'slug'      =>  $slug,
            'results'   =>  $results
        );
    }

}
