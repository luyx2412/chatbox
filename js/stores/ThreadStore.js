var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var UserStore = require('../stores/UserStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _threads = {};
var _users = {};
var queryResult = [];

function _deleteThread(threadID) {
  delete _threads[threadID];
}

function _searchThread(keySearch) {
  for (var threadSearchID in _threads) {
    if (_threads[threadSearchID].name.toLowerCase().indexOf(keySearch.toLowerCase()) != -1) {
      queryResult.push(threadSearchID);
    }
  }
}

var ThreadStore = assign({}, EventEmitter.prototype, {
  init: function(rawMessages) {
    $.each(rawMessages.threads, function(threadID, thread) {
      _threads[threadID] = {
        id: threadID,
        name: thread.name,
        user: thread.users
      };
    }, this);
    if (!_currentID) {
      var allChrono = this.getAllChrono();
      _currentID = allChrono[allChrono.length - 1].id;
    }
  },

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
    return _threads[id];
  },

  getAll: function() {
    return _threads;
  },

  getAllChrono: function() {
    var orderedThreads = [];
    for (var id in _threads) {
      if (queryResult.length === 0) {
        orderedThreads.push(_threads[id]);
      } else {
        for (var i in queryResult) {
          orderedThreads.push(_threads[queryResult[i]]);
        }
        return orderedThreads;
      }
    }
    return orderedThreads;
  },

  getCurrentID: function() {
    return _currentID;
  },

  getCurrent: function() {
    return this.get(this.getCurrentID());
  }

});

ThreadStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      _currentID = action.threadID;
      ThreadStore.emitChange();
      break;

    case ActionTypes.SEARCH_THREAD:
      _searchThread(action.searchQuery);
      ThreadStore.emitChange();
      return queryResult = [];
      break;

    case ActionTypes.DELETE_THREAD:
      _deleteThread(action.threadID);
      ThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      ThreadStore.init(action.rawMessages);
      ThreadStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = ThreadStore;