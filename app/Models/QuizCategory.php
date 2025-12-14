<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizCategory extends Model
{   
    protected $fillable = [
        "quiz_id",
        "category_id"
    ];
    protected $table = 'quiz_category';
}
