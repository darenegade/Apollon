var React = require('react');

var Search = require('./Search');
var Login = require('./Login');
var Playlist = require('./Songlist');

var App = React.createClass({

	getInitialState() {
		return {
			credentials: localStorage.credentials,
			isLoggedIn: false
		}
	},

	componentDidMount() {
		if (this.state.credentials && !this.state.isLoggedIn)
			this.loadPlaylist();
    },

	setCredentials(code) {
		this.setState({
			isLoggedIn: false,
			credentials: code
		});
		localStorage.credentials = code;
		if (code)
			this.loadPlaylist();
	},

	loadPlaylist() {
		this.request("http://localhost:3000/playlist").then(result => {
			this.setState({
				isLoggedIn: true,
				playlist: result
			});
		}, function(e) {
			console.log("test");
			console.error(e);
		});
	},

	request(url) {
		var headers = new Headers();
		headers.append("Authorization", "Basic " + btoa("admin:"+this.state.credentials));
		return fetch(url, {
			cors: true,
			headers: headers
		})
		.then(function(response) {
			if (response.ok)
				return response.json();
			throw new Error(response.status);
		});
	},


	render() {
		return (
			<div>
				<h1 className="greentext">Apollon</h1>
				{ this.state.isLoggedIn
				? <Playlist songs={this.state.playlist} />
				: this.state.credentials
				  ? "loading…"
				  : <Login onComplete={this.setCredentials} message="Use the key that the server generated for you" /> }
				{ this.state.isLoggedIn || this.state.credentials ? <a onClick={e => { e.preventDefault(); this.setCredentials(null); }}>Logout</a> : null }
			</div>
		);
	}
});

module.exports = App;