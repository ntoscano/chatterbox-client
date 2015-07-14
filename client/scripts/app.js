// YOUR CODE HERE:

$(document).ready(function(){

  window.app = {
    roomFilter: null,
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
      var rooms = {};

      _(messages).each(function(message) {
        rooms[message.roomname] = true;
        if (!app.roomFilter || message.roomname === app.roomFilter) {
          var $message = $('<p class="message">');
          $message.text(message.username + ': ' + message.text);
          $messages.append($message);
        }
      });

      app.clearMessages();

      $('#main').append($messages);

      Object.keys(rooms).forEach(function(room) {
        var $room = $('<option class="room"></option>');
        $room.data('room', room);
        $room.text(room);
        $rooms.append($room);
      });
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

    var messageData = {
      username: user,
      text: message,
      roomname: 'lobby'
    };

    app.send(messageData);
    app.fetch();
  });

  $('.rooms').on('change', function() {
    var $room = $(this).find('option:selected');
    console.log($room.data('room'));
    app.roomFilter = $(this).data('room');
    app.fetch();
  });


});