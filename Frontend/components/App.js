var React = require('react');

var Search = require('./Search');
var SongList = require('./SongList');
var CurrentSong=require('./CurrentSong');


var App = React.createClass({

	/*getInitialState(){

		// Extract the favorite locations from local storage

		var favorites = [];

		if(localStorage.favorites){
			favorites = JSON.parse(localStorage.favorites);
		}


	},*/

	currentSong:{
	 name:'Biene Maja',
	 artistName:'Karel Got',
	 albumName:'Bla'

	 },

	toggleFavorite(address){

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



	render(){

		return (

			<div>
				<h1 className="greentext">Apollon</h1>

				<CurrentSong song={this.currentSong}/>

				<Search onSearch={this.searchForAddress} />

				<SongList />

			</div>

		);
	}

});

module.exports = App;