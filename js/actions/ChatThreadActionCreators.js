var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

	clickThread: function(threadID) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.CLICK_THREAD,
			threadID: threadID
		});
	},

	deleteThread: function(threadID) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.DELETE_THREAD,
			threadID: threadID
		});
		ChatWebAPIUtils.deleteThread(threadID);
	},

 searchThread: function(searchQuery) {
		ChatAppDispatcher.dispatch({
			type: ActionTypes.SEARCH_THREAD,
			searchQuery: searchQuery
		});
},

};