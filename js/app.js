var UserSection = require('./components/UserSection.react');
var HeaderSection = require('./components/HeaderSection.react');
var React = require('react');
var juice = require('juice');

window.React = React; 

React.render(
			<UserSection />,
    document.getElementById('modal-login')
);






