var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var UserStore = require('../stores/UserStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _messages = {};
var _users = {};
var _usersEmail = {};

function _addMessages(rawMessages, dataFacebook) {
  $.each(rawMessages.threads, function(threadID, thread) {
    var messageList = thread.messages;
    var index;
    var message = "";
    for (index in messageList) {
      message = messageList[index];
      if (!_messages[message.id]) {
        _messages[message.id] = ChatMessageUtils.convertRawMessage(
          message,
          threadID,
          ThreadStore.getCurrentID()
        );
      }
    }
  });
}

function _deleteMessage(id, currentThreadID) {
  currentThreadID = _messages[id].threadID;
  delete _messages[id];
}

function _update(id, updates, currentThreadID) {
  currentThreadID = _messages[id].threadID;
  _messages[id] = assign({}, _messages[id], updates);
}

function _updateAll(updates) {
  for (var id in _messages) {
    _update(id, updates);
  }
}

var MessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _messages[id];
  },

  getAll: function() {
    return _messages;
  },

  getAllForThread: function(threadID) {
    var threadMessages = [];
    for (var id in _messages) {
      if (_messages[id].threadID === threadID)
        threadMessages.push(_messages[id]);
    }
    return threadMessages;
  },

  getAllForCurrentThread: function() {
    return this.getAllForThread(ThreadStore.getCurrentID());
  }

});

MessageStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      MessageStore.emitChange();
      break;

    case ActionTypes.CREATE_MESSAGE:
      var message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.currentThreadID,
        action.dataFacebook
      );
      if (message.avatar === undefined || message.name === undefined) {
        $('#login-modal').modal('show');
      } else {
        _messages[message.id] = message;
        MessageStore.emitChange();
        return;
      }
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addMessages(action.rawMessages, action.dataFacebook);
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      MessageStore.emitChange();
      break;

    case ActionTypes.DELETE_MESSAGE:
      _deleteMessage(action.id);
      MessageStore.emitChange();
      break;

    case ActionTypes.UPDATE_MESSAGE:
      var text = action.text.trim();
      if (text !== '') {
        _update(action.id, {
          text: text
        });
        MessageStore.emitChange();
      }
      break;

    default:
      // do nothing
  }

});

module.exports = MessageStore;