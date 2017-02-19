// YOUR CODE HERE:
const app = {
  
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function() {
     app.fetch()
     app.handleUsernameClick()

  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        // Here is where we have access to the messages

        data.results.forEach(result => {
          app.renderMessage(result); 
          app.renderRoom(result)});


        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').html('');
  },
  //this function is responsible for displaying messages in the chat window
  //the data from the fetch method is an object with a result property
  //the result property is an array of objects.
  renderMessage: function(fetchedData) {


    $('#chats').append(`<div class="chat"><span class="username">${fetchedData.username}</span>: <span>${fetchedData.text}</span></div>`);
    
  },
  renderRoom: function(fetchedData) {
            //name of the chat room            //roomname property of object
    if ($('#roomSelect').children().text() === fetchedData.roomname){
      return;
    }
    $('#roomSelect').append(`<option value = ${fetchedData.roomname}>${fetchedData.roomname}</option>`);
  },
  handleUsernameClick: function() {
    $('#chats').on('click', '.username', function(){
      var $user = $(this).text();
      var $friends = $('.friend').children().text()
      if(!($friends.includes($user))) {
        $('.friend').append(`<li>${$user} </li>`)  
      }
    })
  },
  handleSubmit: function() {
    var $message = {
      username: '',
      text: $('input').val(),
      roomname: $('#roomSelect').children(':selected').text(),
    };
    $(':submit').on('click', function(){
      app.send($message);
    });
  },
  createRoom: function() {
    $(':button').on('click', function(){
      var $chatroom = $('input').val();
      app.renderRoom({roomname: $($chatroom)})
    })
  }

};
$(document).ready(function() {
  app.init();

  
});







