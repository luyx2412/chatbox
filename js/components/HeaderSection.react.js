var ListUsersName = require('../components/ListUsersName.react');
var ListAvatarOnline = require('../components/ListAvatarOnline.react');
var ChatUserActionCreators = require('../actions/ChatUserActionCreators');
var UserStore = require('../stores/UserStore');
var NameThreadStore = require('../stores/NameThreadStore');
var React = require('react');

var ENTER_KEY_CODE = 13;

function getStateFromStores() {
	return {
		users: UserStore.getUserCurrent(),
		userChecked: UserStore.getUserChecked(),
		threadName: NameThreadStore.getCurrentThreadName(),
		text: ''
	}
}

function getUserData(user) {
  return (
    <ListUsersName
      key={user.id}
      user={user}
    />
  );
}

function getAvatarUser(user) {
	 return (
    <ListAvatarOnline
      key={user.id}
      user={user}
    />
  );
}

var HeaderSection = React.createClass({

	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);
		NameThreadStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
		NameThreadStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var listUsersName = this.state.users.map(getUserData);
		var ListAvatarOnline = this.state.users.map(getAvatarUser);
		var createGroupButton;
		return (
			<div className="header-app">
				<div className="header-left">
					<div className="navbar-header">
						<img className="img-contact" src="img/menu.png" />
						<span>Contacts</span>
						<a onClick={this._show} className="btn btn-danger btn-sm pull-right mt-10">
							<i className="fa fa-plus pr-0"></i>
						</a>
					</div>
				</div>
				<div className="header-right">
					<div className="navbar-header">
						<span>{this.state.threadName}</span>
						<div className="online-status pull-right">
							<ul className="list-inline">
								{ListAvatarOnline}
							</ul>
						</div>
					</div>
				</div>
			<div className="modal fade" id="modal-new-conversation">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
	        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	          <span className="sr-only">Close</span>
	        </button>
	        <h5 className="modal-title">Add new your conversation</h5>
	      </div>
	      <div className="modal-body">
	        	<form className="name-conversation-form">
									  	<div className="form-group">
									      <input 
										      type="text" 
										      className="form-control" 
										      ref="nameInput"
										      id="name-group" 
										      placeholder="Name Group"
										      value={this.state.text}
										      onChange={this._onTextChange}
										      onKeyDown={this._onKeyDown}
									      />
									  	</div>
									</form>
									<ul className="list-group">
										{listUsersName}
									</ul>
	      </div>
	      <div className="modal-footer">
	      		<button type="submit" className="btn btn-sm btn-primary" onChange={this._onChange} onClick={this._createGroup}>Create Group</button>
	        <button type="button" className="btn btn-sm" data-dismiss="modal">Close</button>
	      </div>
					</div>
				</div>
			</div>
			</div>
			
		);
	},

	_show: function() {
		$('#modal-new-conversation').modal('show');
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	},

	_onTextChange: function() {
		this.setState({text: event.target.value});
	},

	_createGroup: function(event) {
		event.preventDefault();
		var nameGroup = this.state.text.concat();
		var userID = this.state.userChecked;
		var usersData = this.state.users;
		var usersCurrentData = [];
		$.each(usersData, function(indexUser, user) {
			$.each(userID, function(indexID, userCurrentID) {
				if (user.id === userCurrentID) {
					usersCurrentData.push(usersData[indexUser]);
				}
			})
		});
		if (nameGroup) {
			ChatUserActionCreators.createConversation(usersCurrentData, nameGroup);
			$('#modal-new-conversation').modal('hide');
		} else {
			React.findDOMNode(this.refs.nameInput).focus(); 
		}
		this.setState({text: ''});
		
	},

	_onKeyDown: function(event) {
	if (event.keyCode === ENTER_KEY_CODE) {
		event.preventDefault();
		var nameGroup = this.state.text.concat();
		var userID = this.state.userChecked;
		var usersData = this.state.users;
		var usersCurrentData = [];
		$.each(usersData, function(indexUser, user) {
			$.each(userID, function(indexID, userCurrentID) {
				if (user.id === userCurrentID) {
					usersCurrentData.push(usersData[indexUser]);
				}
			})
		});
		if (nameGroup) {
			ChatUserActionCreators.createConversation(usersCurrentData, nameGroup);
			$('#modal-new-conversation').modal('hide');
		} else {
			React.findDOMNode(this.refs.nameInput).focus(); 
		}
		this.setState({text: ''});
	}
},


});

module.exports = HeaderSection;