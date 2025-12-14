<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = [
        'quiz_id',
        'question_text',
        'order'
    ];

    public function Quiz(){
        return $this->belongsTo(Quiz::class);
    }

    public function Answers(){
        return $this->hasMany(QuizAnswer::class)->select(["id","quiz_question_id","answer_text","is_correct"]);
    }
}
