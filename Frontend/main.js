window.Creed = require('creed');
Creed.shim(); // global Promise polyfill

require('whatwg-fetch'); // global fetch polyfill

var React = require('react');
var App = require('./components/App');

React.render(
    <App />,
    document.getElementById('apollon')
);
