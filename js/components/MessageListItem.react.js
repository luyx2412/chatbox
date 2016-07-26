var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var classNames = require('classnames');
var React = require('react');

var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var MessageTextInput = React.createClass({
	propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },
  render: function() {
    return (
      <textarea
      	className="edit"
      	onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  },

  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

var MessageListItem = React.createClass({

  propTypes: {
     message: ReactPropTypes.object
  },

  getInitialState: function() {
  	return {
  		isEditing: false
  	}
  },

	render: function() {
		var message = this.props.message;

		var inputEdit;
    	if (this.state.isEditing) {
  		inputEdit =
    		<MessageTextInput
     		onSave={this._onSave}
      		value={message.text}
    		/>;
      }
      
		return (
			<div className="media view" key={message.id} id={message.id}>
				<div className="media-left">
				<a>
					<img className="media-object img-circle" src={message.avatar} />
				</a>
				</div>
				<div className="media-body">
					<div className="pull-right">{message.date.toLocaleTimeString()}</div>
						<h4 className="media-heading">{message.name}</h4>
						<div className="col-lg-11 text-message">
							<span onDoubleClick={this._onDoubleClick}
								className={classNames({
          						'editing': this.state.isEditing
        					})} >    							
							{message.text}
							</span>	
							{inputEdit}						
						</div>													
					<button className="delete-message pull-right" onClick={this._onDestroyClick}>
						<img src={'img/delete.png'} />
					</button>			
				</div>
			</div>
		);
	},
	
	_onDestroyClick: function() {
 		ChatMessageActionCreators.deleteMessage(this.props.message.id, this.props.message.threadID);
	},

	_onDoubleClick: function() {
		this.setState({isEditing: true});
	},

	_onSave: function(text) {
		ChatMessageActionCreators.updateMessage(this.props.message.id, text, this.props.message.threadID);
		this.setState({isEditing: false});
	}

});

module.exports = MessageListItem;