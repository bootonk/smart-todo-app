// Client facing scripts here



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
  </li>
`)
  return $todo;
}

  // //render Todos
  // const renderTodos = (database) => {
  //   $("#tab-1").empty();
  //     database.forEach(todo => {
  //       $("#tab-1").append(createTodoElement(todo))
  //     });
  // }

  //load Todos by category
  const loadTodos = () => {

    for(let i=1; i <= 5; i++) {
      $.get(`api/lists/${i}`, (todos) => {
        // renderTodos(todos);
        $(`#tab-${i}`).empty();
        todos.forEach(todo => {
          $(`#tab-${i}`).append(createTodoElement(todo))
        });
      });

    }
  };

  //add count to category tab
  const categoryCounter = () => {
    for(let i = 1; i <= 5; i++) {
      $.get(`api/lists/count/${i}`, (count) => {
        //update count
        $(`a[href='#tab-${i}'] .count`).text(`(${count})`);
      });
    }
  };

  // //post input field
  // $('#form-input').on('submit', function(event) {
  //   event.preventDefault();
  //   let todo = $('#form-input').serialize();

  //   $.post('/api/lists', todo, () => {
  //     $('#inputText').val('');
  //     loadTodos();
  //   });
  // });


  $('#form-input').on('submit', function(event) {
    event.preventDefault();
    let todoName = $('#inputText').val();
    let category_id = 2;

    $.post('/api/lists', { todo_name: todoName, category_id: category_id})
    
      .then ((data) => {
      // add the new todo item to the DOM
      let $todoItem = createTodoElement(data);
      $(`#tab-${category_id}`).append($todoItem);
      $('#inputText').val('');
      categoryCounter();
    })
  });


    loadTodos();
    categoryCounter();
});




