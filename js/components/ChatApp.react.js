var MessageSection = require('./MessageSection.react');
var ThreadSection = require('./ThreadSection.react');
var React = require('react');

var ChatApp = React.createClass({

	render: function() {
		return (
			<div className="content-app">
				<ThreadSection />
				<MessageSection />
			</div>
		);
	}
});

module.exports = ChatApp;