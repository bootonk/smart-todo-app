// Client facing scripts here
const databaseAutoComplete = require('autoComplete.js');


$(function() {

  console.log("app.js running");

  //create tab
  $('#categories').tabs();

  //create a new element for todo
  const createTodoElement = (todo) => {
    let $todo = $(`
  <li>
    <input id="checkbox-1" type="checkbox">
    <label for="checkbox-1">${todo.name}<span class="box"></span></label>
  </li>
`);
    return $todo;
  };


  // const renderTodos = function (todos) {
  //   const $newTodo = $('#inputText');
  //   $newTodo.empty();
  //   //loops through todos
  //   for (const todo of todos) {
  //     const $todoContent = renderTodo(todo);
  //     $newTodo.prepend($todoContent);
  //   }
  // };

  // //render Todos
  // const renderTodos = (database) => {
  //   $("#tab-1").empty();
  //     database.forEach(todo => {
  //       $("#tab-1").append(createTodoElement(todo))
  //     });
  // }

  //load Todos by category
  const loadTodos = () => {

    for (let i = 1; i <= 5; i++) {
      $.get(`api/lists/${i}`, (todos) => {
        // renderTodos(todos);
        $(`#tab-${i}`).empty();
        todos.forEach(todo => {
          $(`#tab-${i}`).append(createTodoElement(todo));
        });
      });

    }
    
  };

  //post input field
  $('#form-input').on('submit', function(e) {
    e.preventDefault();
    let input = $('#form-input').serialize();
    $.post('/lists', input, () => {
      $('#inputText').val('');
      loadTodos();
    });

    
    //auto complete
    const databaseAutoComplete = [
      'Love in the Time of Cholera',
      'To Kill a Mockingbird',
      'The Great Gatsby',
      'The Godfather',
      'Lord of the Rings',
      'Forrest Gump',
      'The Matrix',
      'Silk Sleep Mask',
      'Silk Slippers',
      'Silk Robe',
      'Alphabet Soup',
    ];
    $("#inputText").autocomplete({
      source: databaseAutoComplete
    });

  });

  // const database = [
  //   {
  //   id: 1,
  //   user_id: 1,
  //   category_id: 1,
  //   name: "Love in the Time of Cholera",
  //   date: "2023-01-01T05:00:00.000Z",
  //   done: false
  //   },
  //   {
  //   id: 2,
  //   user_id: 1,
  //   category_id: 1,
  //   name: "To Kill a Mockingbird",
  //   date: "2023-01-04T07:12:20.000Z",
  //   done: false
  //   },
  //   {
  //   id: 3,
  //   user_id: 1,
  //   category_id: 1,
  //   name: "The Great Gatsby",
  //   date: "2023-01-07T09:24:40.000Z",
  //   done: false
  //   },
  //   {
  //   id: 4,
  //   user_id: 1,
  //   category_id: 1,
  //   name: "1984",
  //   date: "2023-01-10T11:37:00.000Z",
  //   done: false
  //   }
  //   ];


  // database.forEach(todo => {
  //   console.log(todo.name) //get all todo names
  //   console.log(todo.date) //get all todo dates
  //   console.log(todo.done) //get all todo status
  // });


  loadTodos();
});




