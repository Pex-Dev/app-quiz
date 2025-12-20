<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function dynamicTextSearch(Request $request){
        $search = $request["search"];
        $results = Quiz::where('name','LIKE','%'.$search.'%')->limit(10)->get();
        
        return response() -> json($results);
    }
}
