// Client facing scripts here

$(function () {
  //create tab
  $('#categories').tabs();

  //create list
  const createTodo = function (todo) {
    let $todo = $(`
          <li>
            <input id="checkbox-1" type="checkbox">
            <label for="checkbox-1">${todo.user.todo}<span class="box"></span></label>
          </li>
    `)
    return $todo;
  };

  //reder Todos
  const renderTodos = function (todos) {
    const $newTodo = $('#inputText');
    $newTodo.empty();
    //loops through todos
    for (const todo of todos) {
      const $todoContent = createTodo(todo);
      $newTodo.prepend($todoContent);
    }
  };

  //load Todos
  const loadTodos = () => {
    $.get('/lists', (todos) => {
      renderTodos(todos);
    });
  };

  //post input field
  $('#form-input').on('submit', function(e) {
    e.preventDefault();
    let input = $('#form-input').serialize();
    $.post('/lists', input, () => {
      $('#inputText').val('');
      loadTodos();
    });
  });
});

loadTodos();



