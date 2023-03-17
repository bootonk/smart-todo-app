// Client facing scripts here


  $(document).ready(function() {
    $('.logout-button').click(function() {

      $.get('/logout', function() {
        $('#nav-login').show(); // Hide the div with id="nav-login"
        $('.logout-button').hide(); //
        $('.welcome').hide(); // Hide the div with id="nav-login"


      });
    });

  });


