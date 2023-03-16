// Client facing scripts here
// const databaseAutoComplete = require('autoComplete.js');

$(function () {

    $('.email').click(function() {
      // Create pop-up
      const popup = $('<div>').addClass('popup-email');
      const close = $('<a>').addClass('close').text('x');
      const form = $('<form>');
      const label = $('<label>').text('Enter email address:');
      const emailInput = $('<input>').attr('type', 'email').attr('required', true);
      const label_messageTextarea = $('<label>').text('Enter your message');
      const messageTextarea = $('<textarea>').attr('required', true);
      const submit = $('<input>').attr('type', 'submit').val('Send');
      
      // Append pop-up to page
      form.append(label, emailInput, label_messageTextarea, messageTextarea, submit);
      popup.append(close, form);
      $('body').append(popup);

      //active draggable function to pop-up
      popup.draggable({
        handle: label
      });

      //set close pop-up
      close.click(function() {
        popup.remove();
      });
      
      // Send email when form is submitted
      form.on('submit', function(event) {        
        event.preventDefault();
        
        $.get(`api/lists/share`, (todos) => {
        var recipient = 'no-reply@smart-todo.com';
        var subject = `My todo List\n`;
        var body = messageTextarea.val();

          let list1 = "📖 TO READ LIST 📖:\n";
          let list2 = "📺 TO WATCH  📺:\n";
          let list3 = "🛍️ TO SHOP LIST 🛍️:\n";
          let list4 = "🍽️ TO EAT LIST 🍽️:\n";
          let list5 = "OTHER LIST:\n";
          const todosWithCategoryId_1 = todos.filter(todo => todo.category_id === 1 && todo.done === false);
          todosWithCategoryId_1.forEach(todo => {
            list1 += `${todo.name}\n`
          });
          const todosWithCategoryId_2 = todos.filter(todo => todo.category_id === 2 && todo.done === false);
          todosWithCategoryId_1.forEach(todo => {
            list2 += `${todo.name}\n`
          });
          const todosWithCategoryId_3 = todos.filter(todo => todo.category_id === 3 && todo.done === false);
          todosWithCategoryId_1.forEach(todo => {
            list3 += `${todo.name}\n`
          });
          const todosWithCategoryId_4 = todos.filter(todo => todo.category_id === 4 && todo.done === false);
          todosWithCategoryId_1.forEach(todo => {
            list4 += `${todo.name}\n`
          });
          const todosWithCategoryId_5 = todos.filter(todo => todo.category_id === 5 && todo.done === false);
          todosWithCategoryId_1.forEach(todo => {
            list5 += `${todo.name}\n`
          });
          console.log(list1, list2,list3,list4);

          body += "\n";
          body += "\n";
          body += list1;
          body += "\n";
          body += list2;
          body += "\n";
          body += list3;
          body += "\n";
          body += list4;
          body += "\n";
          body += list5;
          
          var mailtoLink = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
          
          window.location.href = mailtoLink;
          
          
          popup.remove();
        });
      });
    });
    
    


    
    // const email = emailInput.val();
    // const message = messageTextarea.val();

    // //*php file saved as send-email.php in /scripts*\\
  
    // // Send AJAX request to PHP file
    // $.ajax({
    //   url: '/scripts/send-email.php',
    //   method: 'POST',
    //   data: {email: email, message: message},
    //   success: function(response) {
    //     alert('Email sent!');
    //     popup-email.remove();
    //   },
    //   error: function() {
    //     alert('Error sending email.');
    //   }
    // });



});
