var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');
var UserStore = require('../stores/UserStore');
var React = require('react');
var ReactPropTypes = React.PropTypes;

function getStateFromStores() {
  return {
  	 allmessages: ReactPropTypes.object.isRequired,
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent(),
    user: UserStore.getAll()
  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

var MessageSection = React.createClass({

	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function(){
		this._scrollToBottom();
		MessageStore.addChangeListener(this._onChange);
		ThreadStore.addChangeListener(this._onChange);
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnMount: function() {
		MessageStore.removeChangeListener(this._onChange);
		ThreadStore.removeChangeListener(this._onChange);
		UserStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var messageListItems = this.state.messages.map(getMessageListItem);
		return (
			<div className="message-section">
				<div className="message-list" ref="messageList">		
				  {messageListItems}
				</div>
				<MessageComposer threadID={this.state.thread.id} userData={this.state.user} />
			</div>
		);
	},

	componentDidUpdate: function() {
		this._scrollToBottom();
	},

	_scrollToBottom: function() {
		var div = this.refs.messageList;
		div.scrollTop = div.scrollHeight;
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}

});

module.exports = MessageSection;