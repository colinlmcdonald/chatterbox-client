// YOUR CODE HERE:

var app = {
  init: function() {

    $('.username').click(function() {
      app.addFriend();
    });

    $('#send').submit(function(event) {
      app.handleSubmit();
      event.preventDefault();
    });

  },

  send: function() {
    var message = {
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby'
    };

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });

  },

  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: undefined,
      type: 'GET',
      success: function (data) {
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message');
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  addMessage: function(message) {
    var $test = $("<div><a href='#' class='username'>" +
      message.username +
      "</a></div>");
    //$test.

    $('#chats').append($test);
  },  

  addRoom: function(roomName) {
    $('#roomSelect').append('<p>' + roomName + '</p>');
  },

  addFriend: function() {
    console.log('hi');
  },

  handleSubmit: function() {
    alert('you rang?');
  }

};


$( function() {
    
      // app.addMessage({
      //   username: 'Mel Brooks',
      //   text: 'I didn\'t get a harumph outa that guy.!',
      //   roomname: 'lobby'
      // });
  $('#message').val('Why so many Mel Brooks quotes?');

  app.init();
      
  });





