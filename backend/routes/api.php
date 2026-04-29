<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TermController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SectionController;


////////ADMINISTRADORES/////////////
Route::post('/admin/login', [AdminController::class, 'login']);
Route::get('/admins', [AdminController::class, 'index']);
Route::post('/admins', [AdminController::class, 'store']);
Route::put('/admins/{id}', [AdminController::class, 'update']);
Route::delete('/admins/{id}', [AdminController::class, 'destroy']);

/////////CATEGORIAS//////////////
Route::get('/sections', [SectionController::class, 'index']);
Route::post('/sections', [SectionController::class, 'store']);
Route::put('/sections/{id}', [SectionController::class, 'update']);
Route::delete('/sections/{id}', [SectionController::class, 'destroy']);

//////////PALAVRAS/////////////
Route::get('/terms', [TermController::class, 'index']);
Route::post('/terms', [TermController::class, 'store']);
Route::put('/terms/{id}', [TermController::class, 'update']);
Route::delete('/terms/{id}', [TermController::class, 'destroy']);