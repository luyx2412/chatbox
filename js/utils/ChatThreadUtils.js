module.exports = {

	getCreatedThreadData: function(user, nameGroup) {
		var timestamp = Date.now();
		return {
			threadID: 't_' + timestamp,
			name: nameGroup,
			users: user
		};
	}

};