<?php

namespace App\Http\Controllers;

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
}
