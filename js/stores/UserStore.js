var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatThreadUtils = require('../utils/ChatThreadUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _users = {};
var _userData = {};
var _userIDChecked = [];
var _threadDataUser = [];

function _getUserData(rawMessages, dataFacebook) {
	$.each(rawMessages.users, function(userID, user) {
		_userData[userID] = {
			id: userID,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			threads: user.threads
		};
		if (_users.email === user.email) {
			_threadDataUser = user.threads;
			return;
		}
	}, this);

}

function update(id, updates) {
	if (updates.complete === false) {
		$.each(_userIDChecked, function(index, userID) {
			if (userID === id) {
				_userIDChecked.splice(index);
			}
		})
	} else {
		_userIDChecked.push(id);
	}
	_userData[id] = assign({}, _userData[id], updates);
}

var UserStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	get: function(_userIDChecked) {
		return _userIDChecked;
	},

	getAll: function() {
		return _users;
	},

	getUserCurrent: function() {
		var userList = [];
		for (var id in _userData) {
			var user = _userData[id];
			userList.push(user);
		}
		return userList;
	},

	getUserCurrentID: function() {
		return _userIDChecked;
	},

	getUserChecked: function() {
		return this.get(this.getUserCurrentID());
	}
});

UserStore.dispatcherToken = ChatAppDispatcher.register(function(action) {

	switch (action.type) {

		case ActionTypes.RECEIVE_RAW_MESSAGES:
			_getUserData(action.rawMessages);
			UserStore.emitChange();
			break;

		case ActionTypes.LOGIN_USER:
			_users = action.dataFacebook;
			UserStore.emitChange();
			break;

		case ActionTypes.USER_UNDO_COMPLETE:
			update(action.id, {
				complete: false
			});
			UserStore.emitChange();
			break;

		case ActionTypes.USER_COMPLETE:
			update(action.id, {
				complete: true
			});
			UserStore.emitChange();
			break;

		case ActionTypes.CREATE_CONVERSATION:
			var user = ChatThreadUtils.getCreatedThreadData(
				action.user,
				action.nameGroup
			);
			return _userIDChecked = [];
			UserStore.emitChange();
			break;

		default:
	}
});

module.exports = UserStore;