var React = require('react');
var SongListEntry = require('./SongListEntry');

var SongList = React.createClass({

	/**
	 * React standard method to define components initial state.
	 */
	getInitialState: function () {
		return {
			songs: this.props.songs
		};
	},

	render(){
		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				{ this.state.songs.map(songObj => <SongListEntry song={songObj}/>) }
			</div>
		)
	}

});

module.exports = SongList;