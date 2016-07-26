var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var React = require('react');
var classNames = require('classnames');

var ReactPropTypes = React.PropTypes;
var ThreadListItem = React.createClass({
	PropTypes: {
		thread: ReactPropTypes.object,
		currentThreadID: ReactPropTypes.string
	},
	
	render: function() {
		var thread = this.props.thread;
		return (
			<li className={classNames({
				'name-list-item': true,
				'active': thread.id === this.props.currentThreadID
			})} 
			onClick={this._onClick}>
				<a className="name-item">
					<img src={'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg'}/>
					<span>{thread.name}</span>
				</a>
			</li>
		);
	},

	_onClick: function() {
		ChatThreadActionCreators.clickThread(this.props.thread.id);
	},

		_deleteThread: function() {
		ChatThreadActionCreators.deleteThread(this.props.thread.id);
	}
});
module.exports = ThreadListItem;