var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var firebaseConnection = require('../firebaseConnection');

module.exports = {

  getAllMessages: function(dataFacebook) {
    firebaseConnection.on('value', function(snapshot) {
      var rawMessages = snapshot.val();
      ChatServerActionCreators.receiveAll(rawMessages, dataFacebook);
    });
  },

  createThread: function(thread) {
    var threadID = ('t_' + Date.now());
    var threadName = thread.name;
    var users = [];
    $.each(thread.users, function(index, user) {
      users.push(user.id);
    });
    var createdThread = {
      name: thread.name,
      users: users
    };
    var threadRef = firebaseConnection.child('/threads/' + threadID);
    threadRef.set(createdThread);
  },

  createMessage: function(message) {
    if (message.name === undefined || message.avatar === undefined) {} else {
      var timestamp = Date.now();
      var threadID = message.threadID || ('t_' + Date.now());
      var id = 'm_' + timestamp;
      var createdMessage = {
        id: message.id,
        name: message.name,
        avatar: message.avatar,
        text: message.text,
        timestamp: timestamp
      };
      var messageRef = firebaseConnection.child('/threads/' + threadID + '/messages');
      messageRef.push().set(createdMessage);
    }
  },

  deleteMessage: function(id, currentThreadID) {
    var messageRef = firebaseConnection.child('/threads/' + currentThreadID + '/messages/');
    messageRef.on('value', function(data) {
      var messageData = data.val();
      $.each(messageData, function(index, messages) {
        if (messages.id === id) {
          messageRef.child(index).remove();
        } else {
          return;
        }
      })
    });
  },

  updateMessage: function(id, text, currentThreadID) {
    var messageRef = firebaseConnection.child('/threads/' + currentThreadID + '/messages/');
    messageRef.on('value', function(data) {
      var messageData = data.val();
      $.each(messageData, function(index, messages) {
        if (messages.id === id) {
          messageRef.child(index + '/text').set(text);
        } else {
          return;
        }
      })
    });
  },

  deleteThread: function(threadID) {
    var threadRef = firebaseConnection.child('/threads/');
    threadRef.child(threadID).remove();
  },
};