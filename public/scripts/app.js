// Client facing scripts here
// const databaseAutoComplete = require('autoComplete.js');


$(function () {

  console.log("app.js running");

  //create tab
  $('#categories').tabs();

  //create a new element for todo
  const createTodoElement = (todo) => {
    let $todo = $(`
  <li>
    <input id="checkbox-1" type="checkbox">
    <label for="checkbox-1">${todo.name}<span class="box"></span></label>
    <button type="submit" class="btn btn-warning btn-sm" >Edit</button>
    <button type="submit" class="btn btn-danger btn-sm delete" id="${todo.id}">Delete</button>
  </li>
`)
    return $todo;
  }

  //load Todos by category
  const loadTodos = () => {

    for (let i = 1; i <= 4; i++) {
      $.get(`api/lists/${i}`, (todos) => {
        // renderTodos(todos);
        $(`#tab-${i}`).empty();
        todos.forEach(todo => {
          $(`#tab-${i}`).append(createTodoElement(todo));
          $(`#${todo.id}`).click(function () {
            alert(`Alert for ${todo.id}.click() called.`);
        });
        });
      });

    }
  };

  //add count to category tab
  const categoryCounter = () => {
    for (let i = 1; i <= 4; i++) {
      $.get(`api/lists/count/${i}`, (count) => {
        //update count
        $(`a[href='#tab-${i}'] .count`).text(`(${count})`);
      });
    }
  };

  // add new todo
  $('#form-input').on('submit', function (event) {
    event.preventDefault();
    let todoName = $('#inputText').val();
    let category_id = 2;

    $.post('/api/lists', { todo_name: todoName, category_id: category_id })

      .then((data) => {
        // add the new todo item to the DOM
        let $todoItem = createTodoElement(data);
        $(`#tab-${category_id}`).append($todoItem);
        $('#inputText').val('');
        categoryCounter();
      })
  });

  // delete new todo

  
  
  loadTodos();
  $('.delete').click(function () {
    alert("Handler for .click() called.");
});
  categoryCounter();
  

});




