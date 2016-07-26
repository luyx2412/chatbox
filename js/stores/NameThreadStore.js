var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var NameThreadStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentThreadName: function() {
    var threads = ThreadStore.getAll(),
      currentID = ThreadStore.getCurrentID(),
      nameCurrentThread = threads[currentID].name;

    return nameCurrentThread;
  }

});

NameThreadStore.dispatchToken = ChatAppDispatcher.register(function(action) {
  ChatAppDispatcher.waitFor([
    ThreadStore.dispatchToken,
    MessageStore.dispatchToken
  ]);

  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      NameThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      NameThreadStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = NameThreadStore;