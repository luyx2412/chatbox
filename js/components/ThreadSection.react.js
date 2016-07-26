var ThreadListItem = require('../components/ThreadListItem.react');
var FilterThreads = require('../components/FilterThreads.react');
var ThreadStore = require('../stores/ThreadStore');
var React = require('react');

function getStateFromStores() {
	return {
		threads: ThreadStore.getAllChrono(),
		currentThreadID: ThreadStore.getCurrentID()
	};
}

var ThreadSection = React.createClass({
	
	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() {
		ThreadStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ThreadStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var ThreadListItems = this.state.threads.map(function(thread) {
			return (
				<ThreadListItem 
				key={thread.id}
				thread={thread}
				threadID = {thread.id}
				currentThreadID={this.state.currentThreadID}
				/>
			);
		}, this);
		return (
			<div className="contact-section">		
					<FilterThreads searchQuery={this.state.searchQuery}>
    	</FilterThreads>		
				<ul className="name-box">
					{ThreadListItems}
				</ul>
			</div>
		);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});

module.exports = ThreadSection;