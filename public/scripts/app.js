// Client facing scripts here
// const databaseAutoComplete = require('autoComplete.js');

$(function() {

  console.log("app.js running");

  //create tab
  $('#categories').tabs();

  //create a new element for todo
  const createTodoElement = (todo) => {
    // console.log('category', todo);
    let $todo = $(`
    <div class="${todo.id} todo-element">
      <div class="todo-item">
        <input id="checkbox-1" type="checkbox">
        <label for="checkbox-1" data-category="${todo.category_id}">${todo.name}<span class="box"></span></label>
      </div>
      <div class="todo-options">
        <button type="submit" class="edit-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
        <button type="submit" class="delete-button delete" id="${todo.id}"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    `);

    return $todo;
  };

  // create a new element for a completed todo
  const createCompleteTodoElement = (completeTodo) => {
    let $completeTodo = $(`
      <div class="${completeTodo.id} todo-element">
        <div class="todo-item">
          <input id="checkbox-1" type="checkbox" checked>
          <label for="checkbox-1">${completeTodo.name}<span class="box"></span></label>
        </div>
        <div class="todo-options">
          <button type="submit" class="edit-button"><i class="fa-solid fa-pen"></i></button>
          <button type="submit" id="${completeTodo.id}" class="delete-button"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `);

    return $completeTodo;
  };

  const createShowCompletedElement = (category) => {
    let $showCompleted = $(`
      <section class="show-completed-${category} completed-element">
        <div class="toggle-completed-${category}"><i class="fa-sharp fa-solid fa-arrow-down completed-element-icon"><p class="completed-element-text">show completed</p></i></div>
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

  //create Uncategorized Container
  const createUncategorizedContainer = () => {
    let $uncategorizedContainer = $(`
      <div class="uncategorized-block">
        <p>Island of Misfit Todos</p>
        <div class="uncategorized-container"></div>
      </div>
    `);

    return $uncategorizedContainer;
  };

  //create Uncategorized Elements
  const createUncategorizedElements = () => {
    $(`#uncategorized`).empty();
    $('#uncategorized').append(createUncategorizedContainer());
    $.get(`api/lists/5`, (uncategorizedTodos) => {
      if (uncategorizedTodos.length > 0) {
        $(`#uncategorized-container`).empty();
        uncategorizedTodos.forEach(uncategorizedTodo => {
          $('.uncategorized-container').append(createTodoElement(uncategorizedTodo));
        });
      }
    });
  };

  //load Todos by category
  const loadTodos = () => {
    console.log("hello");
    createUncategorizedElements();
    for (let i = 1; i <= 5; i++) {
      $.get(`api/lists/${i}`, (todos) => {
        // renderTodos(todos);
        $(`#tab-${i}`).empty();
        todos.forEach(todo => {
          $(`#tab-${i}`).append(createTodoElement(todo));

          // delete todo
          $(`#${todo.id}`).click(function() {
            // console.log(`clicked ${todo.id}`);
            $.post(`/api/lists/${todo.id}/delete`)
              .then((data) => {
                categoryCounter();
                loadTodos();
              });
          });

          // listener and route for updating todo status
          $(`.${todo.id} input`).on("click", function() {
            changeTodoStatus(todo);
          });

        });

        // load completed todos section if there are any
        $.get(`api/lists/complete/${i}`, (completeTodos) => {
          let category = i;
          if (completeTodos.length > 0) {
            if (category <= 4) {
              $(`#tab-${category}`).append(createShowCompletedElement(category));
              $(`.toggle-completed-${category}`).click(function() {
                $(`.completed-container-${category}`).toggle();
              });
            } else if (category === 5) {
              console.log($('.uncategorized-container'));
              $(`.uncategorized-container`).append(createShowCompletedElement(5));
              $(`.toggle-completed-${category}`).click(function() {
                $(`.completed-container-${category}`).toggle();
              });
            }

            // load each todo element
            completeTodos.forEach(completeTodo => {
              $(`.completed-container-${category}`).append(createCompleteTodoElement(completeTodo));
              // listener and route for updating todo status
              $(`.${completeTodo.id} input`).on("click", function() {
                changeTodoStatus(completeTodo);
              });
            });

          }
        });

      });
    }

    // createUncategorizedElements();

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
  $('#form-input').on('submit', function(event) {
    event.preventDefault();
    let todoName = $('#new-todo-input').val();
    let category_id = 1;

    $.post('/api/lists', { todo_name: todoName, category_id: category_id })
      .then((data) => {
        // update category count
        categoryCounter();

        // add the new todo item to the DOM
        let $todoItem = createTodoElement(data);
        if (data.category_id >= 4) {
          $(`#tab-${category_id}`).append($todoItem);
        } else if (data.category_id === 5) {
          createUncategorizedElements();
        }

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
      });
  });

  // edit todo
  $('#categories').on('click', ".edit", function(event) {
    event.preventDefault();
    const todoName = $(event.target).parent().find('label').text(); //find todo name
    const todoId = $(event.target).parent().attr('class'); //find todo id
    $('#Input1').val(todoName); //update name
    $('#todoId').val(todoId); //assign the todoId to modal
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    const newC = $('#updateCategory').find(":selected").val(); //new category id
    $('#exampleModal').hide("slide", 1000);  //model move away
    const id = $('#todoId').val();  //

    $.ajax({
      type: 'POST',
      url: `/api/lists/${id}/update`,
      data: { 'id': newC },  //need to make the format match
      dataType: 'html',  //need to fire html, json does not work
      success: () => {
        loadTodos();   //refresh the page
        categoryCounter();
      }
    });

  });

  //create welcome
  const welcome = () => {
    
    let $welcome = $(`
    <div class="welcome">
      <p>What would like To Do, ${}</p>
    </div>
    `);

    return $welcome;
  };





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
