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
    $('#Input1').val(todoName);
    const category = $(event.target).parent().find('label').data('category');
   
  });

  $('#save').on('click', function(event) {
    event.preventDefault();
    const todo_id = $(event.target).parent().find('div').data();
    console.log($(event.target).parent())
    const newC = $('#updateCategory').val();
    $('#exampleModal').hide("slide", 1000);
    
    const newUpdate = $('#updateCategory').serialize();
    const category = $(event.target).parent().find('label').data('category');

    // $.ajax({
    //   method: 'POST',
    //   url: `/${todo_id}/update`,
    //   data: newC,
    //   sucess: () => {
    //     $('#updateCategory').val();
    //     loadTodos();
    //   }
    // });

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
