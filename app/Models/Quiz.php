<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'isPublic',
        'category_id',
        'image'
    ];

    public function User(){
        return $this->belongsTo(User::class)->select("id","name","image");
    }

    public function Questions(){
        return $this->hasMany(QuizQuestion::class)->select(["id","quiz_id","question_text","order"]);
    }

    public function Category(){
        return $this->belongsTo(Category::class) -> select(["id","name","description"]);
    }
}
