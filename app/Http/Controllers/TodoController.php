<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTodoRequest;
use App\Http\Requests\DeleteTodoBulkRequest;
use App\Http\Requests\UpdateTodoRequest;
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

    /**
     * Update a todo with new data.
     *
     * @param  \App\Http\Requests\UpdateTodoRequest  $request
     * @param  \App\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $todo->update($request->all());

        return $todo;
    }

    /**
     * Delete given todo.
     *
     * @param  \App\Todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return $todo;
    }

    /**
     * Delete selected todos.
     *
     * @param  \App\Http\Requests\DeleteTodoBulkRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function destroyBulk(DeleteTodoBulkRequest $request)
    {
        Todo::whereIn('id', $request->input('id'))->delete();

        return $request->input('id');
    }
}
