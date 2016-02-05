// YOUR CODE HERE:

var app = {
  init: function() {
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
    $('#chats').append('<p>' + message.text + '</p>');
  },  

  addRoom: function(roomName) {
    $('#roomSelect').append('<p>' + roomName + '</p>');
  },

  addFriend: function() {
    console.log('hi');
  }

};

$( function() {
    $('.username').click(function() {
      //alert('hi');
      app.addFriend();
    });
  });





