var ChatUserActionCreators = require('../actions/ChatUserActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var ListAvatarOnline = React.createClass({
	PropTypes: {
		user: ReactPropTypes.object
	},
	render: function() {
		var user = this.props.user;
		return (
				 <li className="tooltip-bottom" data-tooltip={user.name} key={user.id} id={user.id}>
				 	<img className="avatar-online img-circle" src={user.avatar} alt={user.name} />
	  		</li>
		);
	}
});

module.exports = ListAvatarOnline;