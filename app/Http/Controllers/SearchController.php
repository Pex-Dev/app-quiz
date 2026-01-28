<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request){
        $search = $request["search"];
        $results = Quiz::where('name','LIKE','%'.$search.'%')->paginate(20);
        return Inertia::render('search/index',[
            'results'=> $results,
            'searchText' => $search
        ]);
    }

    public function dynamicTextSearch(Request $request){
        $search = $request["search"];
        $results = Quiz::where('name','LIKE','%'.$search.'%')->where('isPublic',1)->limit(10)->get();
        
        return response() -> json($results);
    }
}
