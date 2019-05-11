<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::get('/', "HomeController@index");
// Auth::routes();
Route::get('/board', 'BoardController@index');
Route::get('/', 'BoardController@index');
Route::post('/board/add', 'BoardController@add');
Route::get('/board/show/{board}', 'BoardController@show');
Route::get('/board/dashboard', 'BoardController@dashboard');
Route::post('/board/delete/{board}', 'BoardController@delete');
Route::get('/board/edit/{board}', 'BoardController@getEdit');
Route::post('/board/edit/', 'BoardController@postEdit');
Route::post('/board/like', 'BoardController@toogleLike');
Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

