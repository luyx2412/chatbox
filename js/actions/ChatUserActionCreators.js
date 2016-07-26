var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ChatThreadUtils = require('../utils/ChatThreadUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

	loginUser: function(dataFacebook) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.LOGIN_USER,
			dataFacebook: dataFacebook
		});
	},

	loadUserData: function(rawMessages) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.LOAD_USER_DATA,
			rawMessages: rawMessages
		});
	},

	toggleComplete: function(user) {
		ChatAppDispatcher.dispatch({
			type: user.complete ? ActionTypes.USER_UNDO_COMPLETE : ActionTypes.USER_COMPLETE,
			id: user.id
		});
	},

	createConversation: function(user, nameGroup) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.CREATE_CONVERSATION,
			user: user,
			nameGroup: nameGroup
		});
		var thread = ChatThreadUtils.getCreatedThreadData(user, nameGroup);
		ChatWebAPIUtils.createThread(thread);
	}
};