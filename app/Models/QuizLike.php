<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizLike extends Model
{
    protected $table = 'quizzes_likes';

    protected $fillable = [
        'user_id',
        'quiz_id',
        'like'
    ];
}
