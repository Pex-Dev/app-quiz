<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/', [IndexController::class,'index']);

//Auth
Route::get('/login',[AuthController::class,'index']) -> name('login');
Route::post('/login',[AuthController::class,'store']);
Route::post('/logout',[AuthController::class,'destroy']) -> middleware('auth') -> name('logout');

//Profile
Route::get('/users/{user:name}',[ProfileController::class,'show'])->name('profile');

//Register
Route::get('/register',[RegisterController::class,'index']) -> name('register');
Route::post('/register',[RegisterController::class,'store']);

//Password

Route::get('/forgot-password', [PasswordResetController::class, 'showLinkRequestForm'])
        ->name('password.request');
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])->middleware('throttle:2,1')->name('password.email');        
Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetForm'])
        ->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'reset'])
        ->name('password.update');



//Email
Route::get('/email/verify',[RegisterController::class,'notice'] )->name('verification.notice');
Route::get('/email/verify/{id}/{hash}',[RegisterController::class,'verify'])->name('verification.verify');
Route::post('/email/verification-notification',[RegisterController::class,'send'])->middleware(['auth', 'throttle:2,1'])->name('verification.send');


//Quiz
Route::get('/quiz/create',[QuizController::class,'create']) -> name('quiz.create') -> middleware(['auth','verified']);
Route::get('/quiz/{quiz}',[QuizController::class,'show']) -> name('quiz');
Route::post('/quiz',[QuizController::class,'store'])-> name('quiz.store') -> middleware(['auth','verified']);
Route::get('/quiz/{quiz}/edit',[QuizController::class,'edit']) -> name('quiz.edit') -> middleware(['auth','verified']);
Route::post('/quiz/{quiz}',[QuizController::class,'update']) -> name('quiz.update') -> middleware(['auth','verified']);
Route::post('/quiz/{quiz}/set-complete',[QuizController::class,'setCompleted']) -> name('quiz.completed') -> middleware(['auth','verified']);

//Search
Route::get('search/{search}',[SearchController::class,'index']) ->name('search.index');
Route::get('/search/dynamic/{search}',[SearchController::class,'dynamicTextSearch'])->name('search.dynamic');