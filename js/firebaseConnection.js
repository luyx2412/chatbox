var Firebase = require('firebase/lib/firebase-web');
var baseUrl = 'https://demochatbox.firebaseio.com/';
var firebaseConnection = new Firebase(baseUrl);

module.exports = firebaseConnection;