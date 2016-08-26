$(document).ready(function(){

  $('ul.tabs').tabs();

  $('#save-new-btn').click(function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    $.ajax({
      url: 'http://localhost:3000/new',
      dataType: 'json',
      method: 'post',
      data: { name: name, email: email, phone: phone }
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

  $('.collapsible-body').on('click', '#save-edit-btn', function() {
    // get form stuff
    // get the id from hidden data attribute
    let id = $(this).parent().data('id');
    let email = $('#edit-email').val();
    let phone = $('#edit-phone').val();
    $.post('http://localhost:3000/edit', {
        id: id,
        email: email,
        phone: phone
      },
      function(response) {
        updateContacts(response);
      });
  });

  $('.collapsible').on('click', '.edit-btn', function() {
    let contactBody = $($(this).parent().parent().children()[1]);
    contactBody.empty();
    contactBody.append(
      '<form class="col s12"><div class="row"><div class="input-field col s6">'
      + '<input id="edit-email" type="email" class="validate"><label for="edit-email">Email</label>'
      + '</div><div class="input-field col s6">'
      + '<input id="edit-phone" type="text" class="validate"><label for="edit-phone">Phone</label>'
      + '</div></div><div class="row center"><a class="waves-effect waves-light btn" id="save-edit-btn">'
      + 'Save Changes</a></div></form>'
    );
  });

  $('.collapsible').on('click', '.delete-btn', function(e) {
    e.stopPropagation();
    $.getJSON('http://localhost:3000/delete/' + $(this).parent().parent().data('id'), updateContacts);
  });

});

var updateContacts = function(contacts) {
  $('#contact-list').empty();
  contacts.forEach(function(c) {
    $('#contact-list').append('<li data-id="' + c.id + '">'
        + '<div class="collapsible-header">'
        + '<i class="large material-icons">contact_phone</i>' + c.name
        + '<i class="large material-icons delete-btn" style="float: right;">delete</i>'
        + '<i class="large material-icons edit-btn" style="float: right;">mode_edit</i>'
        + '</div>'
        + '<div class="collapsible-body">'
        + '<p><i class="tiny material-icons">email</i><strong> Email:</strong> ' + c.email + '<br/>'
        + '<i class="tiny material-icons">phone</i><strong> Phone:</strong> ' + c.phone + '</p>'
        + '</div></li>'
    );
  });
};
