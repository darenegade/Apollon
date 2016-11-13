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
		this.container = document.getElementById("scrollcontainer");
		window.addEventListener("resize", this.adjustHeight);
	},

	adjustHeight() {
		console.log(window.innerHeight);
		var availableheight=window.innerHeight-100;
		console.log("set height to "+availableheight);
		this.container.style.height = availableheight+"px";
	},

	render(){
		const ScrollStyle = {
			overflowY: 'scroll',
            width: '100%'
		};

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<div id="scrollcontainer" style={ScrollStyle}>
				{ this.state.songs.map(songObj =>
					<SongListEntry song={songObj} key={songObj.id} handle={this.props.handle} view={this.props.view} />
				) }
				</div>
			</div>
		)
	}

});

module.exports = SongList;