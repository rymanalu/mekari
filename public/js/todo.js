"use strict";function getTodos(){return new Promise(function(o){setTimeout(function(){todos=[{task:"Cook",done:!1},{task:"Code",done:!0}],o()},1500)})}function renderTodoList(){return new Promise(function(o){todoListEl.empty(),todos.length>0?todoListEl.append("You have "+todos.length+" todo for now."):todoListEl.append("You have no todo for now."),o()})}function mounted(){renderTodoList().then(function(){getTodos().then(function(){renderTodoList()})})}var todos=[],todoListEl=$("#todo-list");$(document).ready(function(){mounted()});