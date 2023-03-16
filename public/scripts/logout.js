// Client facing scripts here


  $(document).ready(function() {
    $('.logout-button').click(function() {

      $.get('/logout', function() {
        $('#nav-login').hide(); // Hide the div with id="nav-login"
      });
    });

  });


