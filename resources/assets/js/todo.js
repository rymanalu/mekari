let todos = [];
const todoListEl = $('#todo-list');

function getTodos() {
  // Just for testing for a while...
  return new Promise(resolve => {
    setTimeout(() => {
      todos = [
        {
          task: 'Cook',
          done: false
        },
        {
          task: 'Code',
          done: true
        }
      ];

      resolve();
    }, 1500);
  });
}

function renderTodoList() {
  return new Promise(resolve => {
    todoListEl.empty();

    if (todos.length > 0) {
      todoListEl.append(`You have ${todos.length} todo for now.`);
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
