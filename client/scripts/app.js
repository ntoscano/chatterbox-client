// YOUR CODE HERE:

var parseUrl = 'https://api.parse.com/1/classes/chatterbox';

var displayMessages = function(messages) {
  var $messages = $('<div>');

  _(messages).each(function(message) {
    var $message = $('<p class="message">');
    $message.text(message.text);
    $messages.append($message);
  });
  removeMessages();
  $('#main').append($messages);
};

var getMessages = function() {
  $.ajax({
    url: parseUrl,
    success: function(data) { 
      displayMessages(data.results);
    },
    dataType: 'json'
  });
};

var removeMessages = function() {
  $('.message').remove();
};

setInterval(getMessages, 1000);
