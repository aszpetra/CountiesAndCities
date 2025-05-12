<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CountyController;
use App\Http\Controllers\CityController;

Route::get('/', [CountyController::class, 'index'], function () {
    return view('welcome');
});

Route::get('/{id}/cities', [CityController::class, 'getByCounty']);
Route::post('/cities', [CityController::class, 'create']);
Route::put('/cities/{id}', [CityController::class, 'update']);
Route::delete('/cities/{id}', [CityController::class, 'delete']);
