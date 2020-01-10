<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTodoRequest;
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
        return Todo::latest()->get();
    }

    /**
     * Store a new todo.
     *
     * @param  \App\Http\Requests\CreateTodoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTodoRequest $request)
    {
        $todo = Todo::create([
            'task' => $request->input('task'),
            'done' => false,
        ]);

        return $todo;
    }
}
