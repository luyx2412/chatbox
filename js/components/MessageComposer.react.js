var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var React = require('react');

var ENTER_KEY_CODE = 13;

var MessageComposer = React.createClass({
	propTypes: {
		threadID: React.PropTypes.string.isRequired,
		userData: React.PropTypes.object.isRequired
 },

	getInitialState: function() {
		return {text: ''};
	},

	render: function() {
		return (
			<div className="chat-form">
				<form className="input-group">
					<input type="text" className="form-control" 
						value={this.state.text} 
						onKeyDown={this._onKeyDown}
						onChange={this._onChange}
						autoFocus={true}
						 />
					<span className="form-gim"><img src={'img/gim.png'} /></span>
					<button type="button" className="input-group-addon" onClick={this._handleSubmit}>
						<img src={'img/flight.png'} />
					</button>
				</form>
			</div>
		);
	},

	_onChange: function(event, value) {
		this.setState({text: event.target.value});
	},

	_handleSubmit: function(event) {
		event.preventDefault();
		var text = this.state.text.concat();
		if (text) {
			ChatMessageActionCreators.createMessage(text, this.props.threadID, this.props.userData)
		}
		this.setState({text: ''});
  },

	_onKeyDown: function(event) {
		if (event.keyCode === ENTER_KEY_CODE) {
			event.preventDefault();
			var text = this.state.text.trim();
			if (text) {
				ChatMessageActionCreators.createMessage(text, this.props.threadID, this.props.userData)
			}
			this.setState({text: ''});
		}
	}
});

module.exports = MessageComposer;