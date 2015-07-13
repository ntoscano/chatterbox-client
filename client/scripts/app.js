// YOUR CODE HERE:

var parseUrl = 'https://api.parse.com/1/classes/chatterbox';

var displayMessages = function(messages) {
  var $messages = $('<div>');

  _(messages).each(function(message) {
    var $message = $('<p>');
    $message.text(message.text);
    $messages.append($message);
  });
  $('#main').append($messages);
};

var req = $.ajax({
  url: parseUrl,
  success: function(data) { 
    displayMessages(data.results);
  },
  dataType: 'json'
});

