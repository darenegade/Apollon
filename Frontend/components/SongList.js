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

	componentDidMount() {
		console.log(window.innerHeight);
		availableheight=window.innerHeight-100;
		var elem=document.getElementById("scrollcontainer");
		console.log("set height to "+availableheight);
		elem.style.height= availableheight+"px";
	},

    checkIfSongExists: function (songs) {
      if (songs != null) {
          return songs.map(songObj =>
              <SongListEntry song={songObj} key={songObj.id} handle={this.props.handle} view={this.props.view} />)
      }
    },

	render(){
		const ScrollStyle = {
			overflowY: 'scroll',
            width: '100%'

		};

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<div id="scrollcontainer" style={ScrollStyle}>
				{
                    this.checkIfSongExists(this.state.songs)
				}
				</div>
			</div>
		)
	}

});

module.exports = SongList;