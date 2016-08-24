$(document).ready(function(){

  $('ul.tabs').tabs();

  $('#save-new-btn').click(function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var passData = { name: name, email: email, phone: phone }
    $.ajax({
      url: 'http://localhost:3000/new',
      dataType: 'json',
      method: 'post',
      data: passData
    })
    .done(function(response) {
      updateContacts(response);
    });
  });

  $('#filter-btn').click(function() {
    var pattern = $('#filter-pattern').val();
    $.getJSON('http://localhost:3000/search/' + pattern, function(response) {
      updateContacts(response);
    });
  });

  $('#show-all-btn').click(function() {
    $.getJSON('http://localhost:3000/show', function(response) {
      updateContacts(response);
    });
  });

  $('#save-edit-btn').click(function() {
    // get form stuff
    // get the id from hidden data attribute
    $.post('http://localhost:3000/edit', {}, function(response) {
      // reload contacts on app
    });
  });

  $('#edit-btn').click(function() {

  });

  $('#delete-btn').click(function() {
    
  });

});

var updateContacts = function(contacts) {
  $('#contact-list').empty();
  contacts.forEach(function(c) {
    $('#contact-list').append('<li data-id="' + c.id + '%>">'
        + '<div class="collapsible-header">'
        + '<i class="large material-icons">contact_phone</i>' + c.name
        + '<i class="large material-icons" style="float: right;">delete</i>'
        + '<i class="large material-icons" style="float: right;">mode_edit</i>'
        + '</div>'
        + '<div class="collapsible-body">'
        + '<p><i class="tiny material-icons">email</i><strong> Email:</strong> ' + c.email + '<br/>'
        + '<i class="tiny material-icons">phone</i><strong> Phone:</strong> ' + c.phone + '</p>'
        + '</div></li>'
    );
  });
};
