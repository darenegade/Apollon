var React = require('react');
var SongListEntry = require('./SongListEntry');

var SongList = React.createClass({

	componentDidMount() {
		this.container = document.getElementById("scrollcontainer");
		window.addEventListener("resize", this.adjustHeight);
		this.adjustHeight();
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
				{ this.props.songs.map(songObj =>
					<SongListEntry song={songObj} key={songObj.id} handle={this.props.handle} view={this.props.view} />
				) }
				</div>
			</div>
		)
	}

});

module.exports = SongList;