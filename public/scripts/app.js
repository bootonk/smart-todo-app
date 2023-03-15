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
`)
    return $todo;
  }

  const createUncategorizedContainer = () => {
    let $uncategorizedContainer = $(`
      <div>
        <p>Island of Misfit Todos</p>
        <div class="uncategorized-container"></div>
      </div>
    `);

    return $uncategorizedContainer;
  };

  const createUncategorizedElements = () => {
    $.get(`api/lists/5`, (uncategorizedTodos) => {
      if (uncategorizedTodos.length > 0) {
        $(`#uncategorized`).empty();
        $(`#uncategorized-container`).empty();
        $('#uncategorized').append(createUncategorizedContainer());
        uncategorizedTodos.forEach(uncategorizedTodo => {
          $('.uncategorized-container').append(createTodoElement(uncategorizedTodo));
        })
      }
    });
  };

  //load Todos by category
  const loadTodos = () => {

    for (let i = 1; i <= 4; i++) {
      $.get(`api/lists/${i}`, (todos) => {
        // renderTodos(todos);
        $(`#tab-${i}`).empty();
        todos.forEach(todo => {
          $(`#tab-${i}`).append(createTodoElement(todo));
          $(`#${todo.id}`).click(function () {
            $(`.${todo.id}`).hide("slide", 1000);
            $(`#${todo.id}`).text(`${todo.id}-delete`); //delete todo
            categoryCounter();
        });
        });
      });
    }

    createUncategorizedElements();

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
