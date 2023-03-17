// Client facing scripts here
// const databaseAutoComplete = require('autoComplete.js');

$(function () {

    $('.email').click(function() {
      // Create pop-up
      const popupContainer = $('<div>').addClass('popup-container');
      const popup = $('<div>').addClass('popup-email');
      const close = $('<a>').addClass('close-popup').html('<i class="fa-solid fa-x"></i>');
      const form = $('<form>');
      const label = $('<label>').text('Enter email address:');
      const emailInput = $('<input>').attr('type', 'email').attr('required', true);
      const label_messageTextarea = $('<label>').text('Enter your message');
      const messageTextarea = $('<textarea>').attr('required', true);
      const submit = $('<input>').attr('type', 'submit').val('Send');

            //dropdown menu

        const select = $('<select>').attr('id', 'list-select');
        const label_dropdown = $('<label>').text('Select the list(s)');
        const optionAll = $('<option>').attr('value', 'all').text('All Lists');
        const option1 = $('<option>').attr('value', 'list1').text('To Read List');
        const option2 = $('<option>').attr('value', 'list2').text('To Watch List');
        const option3 = $('<option>').attr('value', 'list3').text('To Shop List');
        const option4 = $('<option>').attr('value', 'list4').text('To Eat List');
        const option5 = $('<option>').attr('value', 'list5').text('Other List');
        select.append(label_dropdown, optionAll, option1, option2, option3, option4, option5);

            //Add a variable to store the selected list value and update it when the select element changes:
            let selectedList = 'all'; // default value
            select.on('change', function() {
              selectedList = $(this).val();
            });

      // Append pop-up to page
      form.append(label, emailInput, select, label_messageTextarea,  messageTextarea, submit);
      popup.append(close, form);
      $('body').append(popupContainer);
      $('.popup-container').append(popup);

      //active draggable function to pop-up
      popup.draggable({
        handle: label
      });

      //set close pop-up
      close.click(function() {
        popup.remove();
        popupContainer.remove();
      });

      // Send email when form is submitted
      form.on('submit', function(event) {
        event.preventDefault();

        $.get(`api/lists/share`, (todos) => {
        var recipient = emailInput.val();
        var subject = `My todo List\n`;

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
          todosWithCategoryId_2.forEach(todo => {
            list2 += `${todo.name}\n`
          });
          const todosWithCategoryId_3 = todos.filter(todo => todo.category_id === 3 && todo.done === false);
          todosWithCategoryId_3.forEach(todo => {
            list3 += `${todo.name}\n`
          });
          const todosWithCategoryId_4 = todos.filter(todo => todo.category_id === 4 && todo.done === false);
          todosWithCategoryId_4.forEach(todo => {
            list4 += `${todo.name}\n`
          });
          const todosWithCategoryId_5 = todos.filter(todo => todo.category_id === 5 && todo.done === false);
          todosWithCategoryId_5.forEach(todo => {
            list5 += `${todo.name}\n`
          });


          var body = messageTextarea.val();
          var subject = `My todo List\n`;
          var listBody = '';

          if (selectedList === 'all') {
            listBody += list1 + '\n' + list2 + '\n' + list3 + '\n' + list4 + '\n' + list5;
          } else if (selectedList === 'list1') {
            listBody += list1;
          } else if (selectedList === 'list2') {
            listBody += list2;
          } else if (selectedList === 'list3') {
            listBody += list3;
          } else if (selectedList === 'list4') {
            listBody += list4;
          } else if (selectedList === 'list5') {
            listBody += list5;
          }

          body += '\n\n' + listBody;


          //create an alert if one of todosWithCategoryId is empty, and only if the user wants to share the this list that is empty
          if (selectedList === 'list1' && todosWithCategoryId_1.length === 0) {
            return alert('You have no todos in the To Read List');
          } else if (selectedList === 'list2' && todosWithCategoryId_2.length === 0) {
            return alert('You have no todos in the To Watch List');
          } else if (selectedList === 'list3' && todosWithCategoryId_3.length === 0) {
            return alert('You have no todos in the To Shop List');
          } else if (selectedList === 'list4' && todosWithCategoryId_4.length === 0) {
            return alert('You have no todos in the To Eat List');
          } else if (selectedList === 'list5' && todosWithCategoryId_5.length === 0) {
            return alert('You have no todos in the Other List');
          }

          //create an alert if the user wants to share all lists, and one of them is empty
          if (selectedList === 'all' && (todosWithCategoryId_1.length === 0 || todosWithCategoryId_2.length === 0 || todosWithCategoryId_3.length === 0 || todosWithCategoryId_4.length === 0 || todosWithCategoryId_5.length === 0)) {
            return alert('You have no todos in one of the lists');
          }






          var mailtoLink = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

          window.location.href = mailtoLink;


          popup.remove();
          popupContainer.remove();
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
