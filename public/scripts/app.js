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
    <div class="${todo.id}">
      <input id="checkbox-1" type="checkbox">
      <label for="checkbox-1" data-category="${todo.category_id}">${todo.name}<span class="box"></span></label>
      <button type="submit" class="btn btn-sm btn-warning edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
      <button type="submit" class="btn btn-sm btn-danger" id="${todo.id}">Delete</button>
    </div>
`);
    return $todo;
  };


  //load Todos by category
  const loadTodos = () => {
    console.log("hello");
    for (let i = 1; i <= 4; i++) {
      $.get(`api/lists/${i}`, (todos) => {
        // renderTodos(todos);
        $(`#tab-${i}`).empty();
        todos.forEach(todo => {
          $(`#tab-${i}`).append(createTodoElement(todo));
          $(`#${todo.id}`).click(function() {
            $(`.${todo.id}`).hide("slide", 1000); //delete todo
            // $(`#${todo.id}`).text(`${todo.id}-delete`); //delete todo

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
      });
  });

  // edit todo
  $('#categories').on('click', ".edit", function(event) {
    event.preventDefault();
    const todoName = $(event.target).parent().find('label').text();
    const todoId = $(event.target).parent().attr('class');
    $('#Input1').val(todoName);
    $('#todoId').val(todoId);
    // const category = $(event.target).parent().find('label').data('category');
   
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    // const todo_id = $(event.target).parent().find('div').data();
    console.log($(event));
    const newC = $('#updateCategory').find(":selected").val();
    console.log(newC);
    $('#exampleModal').hide("slide", 1000);
    const id = $('#todoId').val();
    console.log('id', id);

    const newUpdate = $('#updateCategory').serialize();
    const category = $(event.target).parent().find('label').data('category');

    $.ajax({
      type: 'POST',
      url: `/api/lists/${id}/update`,
      data: { 'id': newC },
      dataType: 'html',
      success: () => {
        console.log('success')
        loadTodos();
      }
    });

  });

  //delete to do
  const deleteTodo = () => {

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
