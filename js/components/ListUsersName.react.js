var ChatUserActionCreators = require('../actions/ChatUserActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var ListUsersName = React.createClass({
	PropTypes: {
		user: ReactPropTypes.object
	},
	render: function() {
		var user = this.props.user;
		return (
				 <li className="list-group-item" key={user.id} id={user.id}>
		  	<div className="checkbox pull-right mt-40">
				  <label className="c-input c-checkbox">
						  <input 
							  type="checkbox" 
							  checked={user.complete} 
							  onChange={this._onToggleComplete} 
						  />
						  <span className="c-indicator"></span>
						</label>
					</div>
					<div className="media">
				  <a className="media-left">
				    <img className="media-object img-circle" src={user.avatar} alt={user.name} />
				  </a>
				  <div className="media-body media-middle">
				    	<h4 className="media-heading">{user.name}</h4>
				  </div>
				</div>
	  </li>
		);
	},

 _onToggleComplete: function() {
   ChatUserActionCreators.toggleComplete(this.props.user);
 },
});

module.exports = ListUsersName;