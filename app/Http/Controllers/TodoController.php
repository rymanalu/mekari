<?php

namespace App\Http\Controllers;

use App\Todo;

class TodoController extends Controller
{
    /**
     * Show todo list & form.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('todo');
    }

    /**
     * Show all todos.
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        return Todo::all();
    }
}
