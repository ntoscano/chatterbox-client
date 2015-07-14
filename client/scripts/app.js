// YOUR CODE HERE:

$(document).ready(function(){

  window.app = {
    roomFilter: 'all',
    server: 'https://api.parse.com/1/classes/chatterbox',
    init: function() {
      app.fetch();
      setInterval(app.fetch, 10000);
    },
    fetch: function() {
      $.ajax({
        url: app.server,
        success: function(data) {
          app.displayMessages(data.results);
        },
        dataType: 'json'
      });
    },
    send: function(message) {
      $.ajax({
        type: "POST",
        data: JSON.stringify(message),
        success: function(messageData){
        },
        url: app.server,
        dataType: 'json'
      });
    },
    displayMessages: function(messages) {
      var $messages = $('<div id="chats"></div>');
      var $rooms = $('.rooms');
      var rooms = {all: true};

      _(messages).each(function(message) {
        rooms[message.roomname] = true;
        if (app.roomFilter === 'all' || message.roomname === app.roomFilter) {
          var $message = $('<p class="message">');
          $message.text(message.username + ': ' + message.text);
          $messages.append($message);
        }
      });

      app.clearMessages();

      $('#main').append($messages);

      Object.keys(rooms).forEach(function(room) {
        var $room = $('<option class="room"></option>');
        $room.text(room);
        $rooms.append($room);
      });

      $rooms.val(app.roomFilter);

    },
    clearMessages: function() {
      $('.rooms').children().remove();
      $('#chats').remove();
    }
  };

  app.init();

  $('.send-message').on('click', function() {
    var user = $('.user-name').val();
    var message = $('.user-message').val();
    var room = $('.user-room').val();

    app.roomFilter = room ? room : app.roomFilter;

    var messageData = {
      username: user,
      text: message,
      roomname: app.roomFilter
    };

    app.send(messageData);
    app.fetch();
  });

  $('.rooms').on('change', function() {
    app.roomFilter = $(this).val();
    app.fetch();
  });


});