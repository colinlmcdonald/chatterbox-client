// YOUR CODE HERE:

var app = {
  init: function() {

    $('.username').click(function() {
      app.addFriend();
    });

    $('#send').submit(function(event) {
      app.handleSubmit();
      event.stopImmediatePropagation();
    });

  },

  send: function() {
    var message = {
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby'
    };

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });

  },

  fetch: function() {
    $.ajax({
      url: undefined,
      type: 'GET',
      success: function (data) {
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message');
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  makeSafeText: function(string) {
    return string.replace( /&/g, "&amp;")
                 .replace( /</g, "&lt;")
                 .replace( />/g, "&gt;")
                 .replace( /'/g, "&#x27;")
                 .replace( /"/g, "&quot;")
                 .replace( "/", "&#x2F;");
  },

  addMessage: function(message) {
    console.log("safe username:", this.makeSafeText( message.username ) );
    // var $test = $("<div><a href='#' class='username'>" +
    //   makeSafeText( message.username ) +
    //   "</a></div>");

    // $('#chats').append($test);
  },  

  addRoom: function(roomName) {
    $('#roomSelect').append('<p>' + roomName + '</p>');
  },

  addFriend: function() {
    console.log('hi');
  },

  handleSubmit: function() {

  }

};

var handleMessages = function(messages) {
  messages.forEach( function(msg) {
    app.addMessage(msg);
  });
};

$.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  success: function (data) {
    handleMessages( data.results );
  },
  error: function (data) {
    console.error('chatterbox: Failed to receive message');
  }
});







