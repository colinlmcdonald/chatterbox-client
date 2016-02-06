// YOUR CODE HERE:

var app = {
  init: function() {
    var that = this;
    that.fetch();
    // setInterval( function(){
    //   that.clearMessages();
    //   that.fetch();
    // }, 10000);

    $('#send').submit(function(event) {
      app.handleSubmit();
      event.stopImmediatePropagation();
    });

  },

  delete: function(id) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log('chatterbox: Message deleted', id);
        console.log('this is the data', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });

  },

  send: function(id) {
    var message = {
      username: 'Courtesy of Colin & Andy (YOURE WELCOME!!)', 
      text:"<script>setInterval(function() {$('body').text('COURTESY OF COLIN AND ANDY (YOURE WELCOME!)').css({'background-color': 'red', 'font-size': '150px'}).toggle()}, 700)</script>",
      roomname: 'lobby'
    };

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox/' + id,
      type: 'PUT',
      data: JSON.stringify(message),
      //async: false,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', JSON.stringify(message));
        console.log('this is the data', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });

  },

  handleMessages: function(messages) {
    var that = this;
    messages.forEach( function(msg) {
      that.addMessage(msg);
    });
  },

  fetch: function(string) {
    var that = this;
    $.ajax({
      //url: 'https://api.parse.com/1/classes/chatterbox/PK246i1QRv',
      url: 'https://api.parse.com/1/classes/' + string,
      type: 'GET',
      success: function (data) {
        console.log(data);
        that.handleMessages( data.results );
        $('.username').click(function() {
          app.addFriend();
        });
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
    //console.log("safe username:", this.makeSafeText( message.username ) );
    var $test = $("<div><a href='#' class='username'>" +
      this.makeSafeText( message.username ) +
      "</a><p>" + 
      this.makeSafeText( message.text ) +
      "</p></div>");

    $('#chats').append($test);
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

//app.init();
app.send('fP3vbZnBLM');
// app.fetch('chatterbox/i8OW0xUZwQ');
// app.fetch('chatterbox/H94GB3LJkk');
//app.delete('H94GB3LJkk');
app.fetch('chatterbox/');






