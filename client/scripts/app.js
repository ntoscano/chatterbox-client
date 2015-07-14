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
          var $message = $('<div class="message">');
          var $username = $('<a href="" class="user-name">');
          var $text = $('<p>');

          if (friends.indexOf(message.username) !== -1) {
            $text.addClass('friend');
          }

          $username.text(message.username);
          $text.text(': ' + message.text);

          $message.append($username).append($text);
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

  var friends = [];

  app.init();

  $('.send-message').on('click', function() {
    var user = $('.input-user-name').val();
    var message = $('.input-user-message').val();
    var room = $('.input-user-room').val();

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

  $('body').on('click', '.user-name', function(event){
    event.preventDefault();
    friends.push($(this).text());
    app.fetch();
  });


});