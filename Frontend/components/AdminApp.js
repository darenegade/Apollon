var React = require('react');

var Search = require('./Search');
var Login = require('./Login');
var Playlist = require('./LocationList');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');


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
			credentials: code
		});
		localStorage.credentials = code;
		this.loadPlaylist();
	},

	loadPlaylist() {
		this.request("playlist.json").then(console.log, function(e) {
			console.log("test");
			console.error(e);
		});
	},

	request(url) {
		var headers = new Headers();
		headers.append("Authorization", "Basic " + btoa("admin:"+this.state.credentials));
		return fetch(url, {
			headers: headers
		})
		.then(function(response) {
			if (response.ok)
				return response.text();
			throw new Error(response.status);
		});
	},

	toggleFavorite(address) {

		if(this.isAddressInFavorites(address)){
			this.removeFromFavorites(address);
		}
		else{
			this.addToFavorites(address);
		}

	},

	addToFavorites(address){

		var favorites = this.state.favorites;

		favorites.push({
			address: address,
			timestamp: Date.now()
		});

		this.setState({
			favorites: favorites
		});

		localStorage.favorites = JSON.stringify(favorites);
	},

	removeFromFavorites(address){

		var favorites = this.state.favorites;
		var index = -1;

		for(var i = 0; i < favorites.length; i++){

			if(favorites[i].address == address){
				index = i;
				break;
			}

		}

		// If it was found, remove it from the favorites array

		if(index !== -1){

			favorites.splice(index, 1);

			this.setState({
				favorites: favorites
			});

			localStorage.favorites = JSON.stringify(favorites);
		}

	},

	isAddressInFavorites(address){

		var favorites = this.state.favorites;

		for(var i = 0; i < favorites.length; i++){

			if(favorites[i].address == address){
				return true;
			}

		}

		return false;
	},

	searchForAddress(address){

		var self = this;

		// We will use GMaps' geocode functionality,
		// which is built on top of the Google Maps API

		GMaps.geocode({
			address: address,
			callback: function(results, status) {

				if (status !== 'OK') return;

				var latlng = results[0].geometry.location;

				self.setState({
					currentAddress: results[0].formatted_address,
					mapCoordinates: {
						lat: latlng.lat(),
						lng: latlng.lng()
					}
				});

			}
		});

	},

	render() {
		return (
			<div>
				<h1 className="greentext">Apollon</h1>
				{ this.state.loggedIn
				? <Playlist locations={[]} />
				: this.state.credentials
				  ? "loading…"
				  : <Login onComplete={this.setCredentials} message="Use the key that the server generated for you" /> }
			</div>
		);
	}
});

module.exports = App;