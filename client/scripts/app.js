// YOUR CODE HERE:

var app = {
  init: function() {
    var that = this;
    that.fetch();
    setInterval( function(){
      that.clearMessages();
      that.fetch();
    }, 10000);

    $('#send').submit(function(event) {
      app.handleSubmit();
      event.stopImmediatePropagation();
    });

  },

  send: function() {
    var message = {
      username: 'Evil Twins',
      text: 'Were on our way!',
      roomname: 'lobby'
    };

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
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

  fetch: function() {
    var that = this;
    $.ajax({
      //url: 'https://api.parse.com/1/classes/chatterbox/PK246i1QRv',
      url: 'https://api.parse.com/1/classes/chatterbox',
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

app.init();
app.send();








