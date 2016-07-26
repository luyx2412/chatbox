var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var FilterThreads = React.createClass({

 getInitialState: function() {
     return {
        search: this.props.searchQuery,
     }
 },
 componentWillReceiveProps: function(nextProps) {
   this.setState({
       search: nextProps.searchQuery
   });
 },
	render: function() {
		return (
			<div className="filter-box">
				<div className="filter">
					<span><img src={'img/search-icon.png'} /></span>
					<input className="form-control" ref='search' name='search' type='text' value={this.state.search} onChange={this.onSearchChange} placeholder="Filter" />
				</div>
			</div>
		);
	},

 onSearchChange: function() {
    var searchQuery = React.findDOMNode(this.refs.search).value;
    ChatThreadActionCreators.searchThread(searchQuery);
    this.setState({
    	search: searchQuery
    });
	}
});

module.exports = FilterThreads;