var React = require('react');
var ReactPropTypes = React.PropTypes;

var NameGroupComposer = React.createClass({
 getInitialState: function() {
			return {text: ''};
 },

	render: function() {
		return (
			<input 
     type="text" 
     className="form-control" 
     id="name-group" 
     placeholder="Name Group"
     value={this.state.text}
     onChange={this._onChange}
    />
		);
	},
 // _save: function() {
 //  this.props.onSave(this.state.value);
 //  this.setState({
 //    value: ''
 //  });
	// },
	
	_onChange: function(event) {
		this.setState({text: event.target.value});
 }
});

module.exports = NameGroupComposer;