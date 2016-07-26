var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var firebaseConnection = require('../firebaseConnection');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

	createMessage: function(text, currentThreadID, dataFacebook) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.CREATE_MESSAGE,
			text: text,
			currentThreadID: currentThreadID,
			dataFacebook: dataFacebook
		})
		var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID, dataFacebook);
		ChatWebAPIUtils.createMessage(message);
	},

	deleteMessage: function(id, currentThreadID) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.DELETE_MESSAGE,
			id: id,
			currentThreadID: currentThreadID
		});
		ChatWebAPIUtils.deleteMessage(id, currentThreadID);
	},

	updateMessage: function(id, text, currentThreadID) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.UPDATE_MESSAGE,
			id: id,
			text: text,
			currentThreadID: currentThreadID
		});
		ChatWebAPIUtils.updateMessage(id, text, currentThreadID);
	}
};