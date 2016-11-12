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
		const ScrollStyle = {
			overflowY: 'scroll'
		};

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<div style={ScrollStyle}>
					{ this.state.songs.map(songObj => <SongListEntry song={songObj}/>) }
				</div>
			</div>

		)
	}

});

module.exports = SongList;