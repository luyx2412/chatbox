module.exports = {
	convertRawMessage: function(rawMessage, threadID) {
		return {
			id: rawMessage.id,
			threadID: threadID,
			name: rawMessage.name,
			avatar: rawMessage.avatar,
			date: new Date(rawMessage.timestamp),
			text: rawMessage.text
		};
	},

	getCreatedMessageData: function(text, currentThreadID, dataFacebook) {
		var timestamp = Date.now();
		return {
			id: 'm_' + timestamp,
			threadID: currentThreadID,
			avatar: dataFacebook.profileImageURL,
			name: dataFacebook.displayName,
			date: new Date(timestamp),
			text: text
		};
	}

};