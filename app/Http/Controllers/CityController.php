<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\County;
use App\Models\City;

class CityController extends Controller
{
    //create, read, update, delete
    
    public function create(Request $request) {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'county_id' => 'required|exists:counties,id',
        ]);
    
        $city = City::create($validated);
    
        return response()->json($city);
        
    }

    public function getByCounty($countyId) {
        $cities = City::where('county_id', $countyId)->get();

        return response()->json($cities);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $city = City::findOrFail($id);
        $city->name = $request->input('name');
        $city->save();

        return response()->json(['success' => true, 'city' => $city]);
    }

    public function delete($id) {
        $city = City::findOrFail($id);
        $city->delete();

        return response()->json(['success' => true]);
    }
}
