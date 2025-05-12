<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\County;

class CountyController extends Controller
{
    public function index() {
        $counties = County::all();
        return view('welcome', compact('counties'));
    }
}
