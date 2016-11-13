var React = require('react');
var SongListEntry = require('./SongListEntry');

var SongList = React.createClass({

	componentDidMount() {
		
		window.addEventListener("resize", this.adjustHeight);
		this.adjustHeight();
	},

	adjustHeight() {
		var elem = document.getElementById("scrollcontainer");
		console.log(window.innerHeight);
		var availableheight = window.innerHeight-elem.getBoundingClientRect().top;

		console.log("set height to "+availableheight);
		elem.style.height = availableheight+"px";
	},


	render(){
		const ScrollStyle = {
			overflowY: 'scroll',
            webkitOverflowScrolling: 'touch',
            width: '100%'
		};

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<div id="scrollcontainer">
				{ this.props.songs.length ?
					this.props.songs.map(songObj =>
						<SongListEntry song={songObj} key={songObj.id} handle={this.props.handle} view={this.props.view} />
					)
				  : <span className="error">No results</span>

				}
				</div>
			</div>
		)
	}

});

module.exports = SongList;