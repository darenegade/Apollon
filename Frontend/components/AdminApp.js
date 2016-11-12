var React = require('react');

var Search = require('./Search');
var Login = require('./Login');
var Playlist = require('./Songlist');

var App = React.createClass({

	getInitialState() {
		return {
			credentials: localStorage.credentials,
			isLoggedIn: false,
			playlist: [],
			loginmessage: "Use the key that the server generated for you"
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
		this.request("/playlist").then(result => {
			this.setState({
				isLoggedIn: true,
				playlist: result
			});
		}, err => {
			console.error(err);
			this.setState({
				credentials: null,
				loginmessage: err.message
			});
		});
	},

	request(url) {
		var headers = new Headers();
		headers.append("Authorization", "Basic " + btoa("admin:"+this.state.credentials));
		return Creed.timeout(2000, fetch(url, {
			cors: true,
			headers: headers
		})
		.then(function(response) {
			if (response.ok)
				return response.json();
			throw new Error("Network error: "+response.status);
		}));
	},


	render() {
		return (
			<div>
				<h1 className="greentext">Apollon</h1>
				{ this.state.isLoggedIn
				? <Playlist songs={this.state.playlist} />
				: this.state.credentials
				  ? "loading…"
				  : <Login onComplete={this.setCredentials} message={this.state.loginmessage} /> }
				{ this.state.isLoggedIn || this.state.credentials ? <a onClick={e => { e.preventDefault(); this.setCredentials(null); }}>Logout</a> : null }
			</div>
		);
	}
});

module.exports = App;