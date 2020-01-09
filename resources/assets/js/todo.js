let todos = [];
const todoListEl = $('#todo-list');

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
        let { task } = todo;
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
            <input type="checkbox"${checked}> ${task} ${delEl}
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

function mounted() {
  renderTodoList().then(() => {
    getTodos().then(() => {
      renderTodoList();
    });
  });
}

$(document).ready(() => {
  mounted();
});
