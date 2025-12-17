<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompletedQuizzes extends Model
{
    protected $table = 'users_completed_quizzes';

    protected $fillable = [
        'user_id',
        'quiz_id'
    ];
}
