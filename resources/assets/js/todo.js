let todos = [];
const todoListEl = $('#todo-list');
const taskFieldEl = $('#task');
const submitBtnEl = $('#submit');

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
        const delEl = `<a href="#" style="text-decoration:none; color:red;" title="Delete">
          [<i class="glyphicon glyphicon-trash"></i>]
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
      todoListEl.append(`<button class="btn btn-danger">Delete Selected</button>`);
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

function mounted() {
  renderTodoList().then(() => {
    getTodos().then(() => {
      renderTodoList();
    });
  });
}

$(document).ready(() => {
  $('#todo-list').on('click', '.todo-checkbox', e => {
    const todo = $(e.target);
    const id = todo.attr('todo-id');
    const done = todo.is(':checked');

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

  mounted();
});
