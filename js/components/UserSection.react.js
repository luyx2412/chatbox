var ChatUserActionCreators = require('../actions/ChatUserActionCreators');
var firebaseConnection = require('../firebaseConnection');
var UserStore = require('../stores/UserStore');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var HeaderSection = require('../components/HeaderSection.react');
var ChatApp = require('../components/ChatApp.react');
var React = require('react');

var ReactPropTypes = React.PropTypes;

function getStateFromStores() {
	return {};
}

var UserSection = React.createClass({

	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() { 
		$('#login-modal').modal('show');
		UserStore.removeChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		$('#login-modal').modal('hide');
		UserStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div className="modal fade" id="login-modal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
	        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	          <span className="sr-only">Close</span>
	        </button>
	        <h4 className="modal-title">Please login to chat</h4>
	      </div>
	      <div className="modal-body">
	      			<form>
		      				<fieldset className="form-group">
										    <label htmlFor="formGroupExampleInput">Email</label>
										    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Your Email" />
										  </fieldset>
										  <fieldset className="form-group">
										    <label htmlFor="formGroupExampleInput2">Password</label>
										    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Your Password" />
										  </fieldset>
	      			</form>
	      			<div className="text-center"><label>Or</label></div>
	        	<button className="btn btn-block btn-primary-outline" onClick={this._login}>
	        	<i className="fa fa-facebook"></i>
	        	login with facebook
	        	</button>
	      </div>
	      <div className="modal-footer">
	        <button type="button" className="btn btn-sm" data-dismiss="modal">Close</button>
	      </div>
					</div>
				</div>
			</div>
			)
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	},

	_login : function() {
		firebaseConnection.authWithOAuthPopup("facebook", function(error, authData) {
			var dataFacebook = authData.facebook;
			ChatUserActionCreators.loginUser(dataFacebook);
			$('#login-modal').modal('hide');
			firebaseConnection.on('value', function(snapshot) {
					snapshot.val();
					// var dataLoad = snapshot.val();
					// $.each(dataLoad.users, function(userID, user) {
						// if (dataFacebook.email === user.email) {
							ChatWebAPIUtils.getAllMessages(dataFacebook);
							React.render(
						    <ChatApp />,
						    document.getElementById('content-section')
						 );
						 React.render(
							  <HeaderSection />,
							  document.getElementById('header-section')
							);
						//}
					//})
			})
		});

 }
});

module.exports = UserSection;