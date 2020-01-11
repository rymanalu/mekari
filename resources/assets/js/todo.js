let todos = [];
const todoListEl = $('#todo-list');
const taskFieldEl = $('#task');
const submitBtnEl = $('#submit');
let selectedTodos = [];

submitBtnEl.click(() => {
  saveTodo().then(() => {
    taskFieldEl.val('');

    getTodos().then(() => {
      renderTodoList();
    });
  }).catch(err => {
    alert(err);

    console.error(err);
  });
});

function getTodos() {
  return new Promise(resolve => {
    request('/api/todos').then(data => {
      todos = data;

      resolve();
    }).catch(err => {
      console.error(err);

      todos = [];

      resolve();
    });
  })
}

function renderTodoList() {
  return new Promise(resolve => {
    todoListEl.empty();

    if (todos.length > 0) {
      const todoList = todos.map(todo => {
        let { id, task } = todo;
        let checked = '';
        const delEl = `<a href="#" style="text-decoration:none; color:red;" title="Delete" class="todo-delete" todo-id="${id}">
          [<i class="glyphicon glyphicon-trash" todo-id="${id}"></i>]
        </a>`;

        if (todo.done) {
          task = `<del>${todo.task}</del>`;
          checked = ' checked';
        }

        return `<div class="checkbox">
          <label>
            <input type="checkbox"${checked} todo-id="${id}" class="todo-checkbox"> ${task} ${delEl}
          </label>
        </div>`;
      }).join('');

      todoListEl.append(todoList);
      todoListEl.append(`<button class="btn btn-danger todo-delete-bulk">Delete Selected</button>`);
    } else {
      todoListEl.append('You have no todo for now.');
    }

    resolve();
  });
}

function saveTodo() {
  const task = taskFieldEl.val();

  return new Promise((resolve, reject) => {
    if (task.length < 1) {
      reject(`Todo shouldn't empty.`);

      return;
    }

    request('/api/todos', 'POST', { task }).then(data => {
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
}

function updateTodoStatus(id, done) {
  return new Promise((resolve, reject) => {
    request(`/api/todos/${id}`, 'PUT', { done }).then(data => {
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
}

function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    request(`/api/todos/${id}`, 'DELETE').then(data => {
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
}

function deleteBulkTodos() {
  return new Promise((resolve, reject) => {
    request('/api/todos/delete-bulk', 'POST', { id: selectedTodos }).then(() => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
}

function mounted() {
  renderTodoList().then(() => {
    getTodos().then(() => {
      renderTodoList();

      $('.todo-checkbox:checked').each((_, el) => {
        const id = $(el).attr('todo-id');

        selectedTodos.push(id);
      });
    });
  });
}

$(document).ready(() => {
  $('#todo-list').on('click', '.todo-checkbox', e => {
    const todo = $(e.target);
    const id = todo.attr('todo-id');
    const done = todo.is(':checked');

    if (done) {
      selectedTodos.push(id);
    } else {
      const i = selectedTodos.indexOf(id);

      if (i > -1) {
        selectedTodos.splice(i, 1);
      }
    }

    updateTodoStatus(id, done).then(() => {
      e.preventDefault();

      getTodos().then(() => {
        renderTodoList();
      });
    }).catch(err => {
      alert(err);

      console.error(err);
    });
  });

  $('#todo-list').on('click', '.todo-delete', e => {
    const id = $(e.target).attr('todo-id');

    deleteTodo(id).then(() => {
      e.preventDefault();

      getTodos().then(() => {
        renderTodoList();
      });
    }).catch(err => {
      alert(err);

      console.error(err);
    });
  });

  $('#todo-list').on('click', '.todo-delete-bulk', () => {
    if (selectedTodos.length > 0) {
      deleteBulkTodos().then(() => {
        selectedTodos = [];

        getTodos().then(() => {
          renderTodoList();
        });
      }).catch(err => {
        alert(err);

        console.error(err);
      });
    }
  });

  mounted();
});
