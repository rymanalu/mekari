<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['task', 'done'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = ['done' => 'boolean'];
}
