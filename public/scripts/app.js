// Client facing scripts here
// const databaseAutoComplete = require('autoComplete.js');

$(function () {
  console.log("app.js running");

  //create tab
  $('#categories').tabs();

  //create a new element for todo
  const createTodoElement = (todo) => {
    let $todo = $(`
    <div class="${todo.id}">
      <input id="checkbox-1" type="checkbox">
      <label for="checkbox-1">${todo.name}<span class="box"></span></label>
      <button type="submit" class="btn btn-warning btn-sm" >Edit</button>
      <button type="submit" class="btn btn-danger btn-sm delete" id="${todo.id}">Delete</button>
    </div>
    `);

    return $todo;
  }

  // create a new element for a completed todo
  const createCompleteTodoElement = (completeTodo) => {
    let $completeTodo = $(`
      <div class="${completeTodo.id}">
        <input id="checkbox-1" type="checkbox" checked>
        <label for="checkbox-1">${completeTodo.name}<span class="box"></span></label>
        <button type="submit" class="btn btn-warning btn-sm" >Edit</button>
        <button type="submit" class="btn btn-danger btn-sm delete" id="${completeTodo.id}">Delete</button>
      </div>
    `);

    return $completeTodo;
  };

  const createShowCompletedElement = (category) => {
    let $showCompleted = $(`
      <section class="show-completed-${category}">
        <div class="toggle-completed-${category}"><i class="fa-sharp fa-solid fa-arrow-down">Show completed</i></div>
        <div class="completed-container-${category}" style="display:none"></div>
      </section>
    `);

    return $showCompleted;
  };

  // route for updating todo status
  const changeTodoStatus = (todo) => {
    $.post(`/api/lists/${todo.id}/check`)
    .then((data) => {
      categoryCounter();
      loadTodos();
    });
  };

  //load Todos by category
  const loadTodos = () => {

    for (let i = 1; i <= 4; i++) {
      $.get(`api/lists/${i}`, (todos) => {
        console.log(todos);
        // renderTodos(todos);
        $(`#tab-${i}`).empty();
        todos.forEach(todo => {
          $(`#tab-${i}`).append(createTodoElement(todo));
          $(`#${todo.id}`).click(function () {
            $(`.${todo.id}`).hide("slide", 1000);
            $(`#${todo.id}`).text(`${todo.id}-delete`); //delete todo
            categoryCounter();
          });

          // listener and route for updating todo status
          $(`.${todo.id} input`).on("click", function() {
            changeTodoStatus(todo);
          })
          // });

        });

        // load completed todos section if there are any
        $.get(`api/lists/complete/${i}`, (completeTodos) => {
          let category = i;
          if (completeTodos.length > 0) {
            $(`#tab-${category}`).append(createShowCompletedElement(category));
            $(`.toggle-completed-${category}`).click(function() {
              $(`.completed-container-${category}`).toggle();
            });

            // load each todo element
            completeTodos.forEach(completeTodo => {
              $(`.completed-container-${category}`).append(createCompleteTodoElement(completeTodo));
              // listener and route for updating todo status
              $(`.${completeTodo.id} input`).on("click", function() {
                changeTodoStatus(completeTodo);
              })
            });

          }
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
    let todoName = $('#new-todo-input').val();
    let category_id = 1;

    $.post('/api/lists', { todo_name: todoName, category_id: category_id })

      .then((data) => {
        // update category count
        categoryCounter();

        // add the new todo item to the DOM
        let $todoItem = createTodoElement(data);
        $(`#tab-${category_id}`).append($todoItem);

        // show tab for the category that was added to
        const tabLoad = (data.category_id - 1);
        console.log('tabload:', tabLoad);
        $(`#categories`).tabs({
          active: tabLoad
        });

        // reload todos to show new item without refresh
        loadTodos();

        // clear form
        $('#new-todo-input').val('');
      })
  });

  // delete new todo

      //auto complete
    // const databaseAutoComplete = [
    //   'Love in the Time of Cholera',
    //   'To Kill a Mockingbird',
    //   'The Great Gatsby',
    //   'The Godfather',
    //   'Lord of the Rings',
    //   'Forrest Gump',
    //   'The Matrix',
    //   'Silk Sleep Mask',
    //   'Silk Slippers',
    //   'Silk Robe',
    //   'Alphabet Soup',
    // ];
    // $("#new-todo-input").autocomplete({
    //   source: databaseAutoComplete
    // });

  loadTodos();
  categoryCounter();


});
