var React = require('react');
var SongListEntry = require('./SongListEntry');

var SongList = React.createClass({

	componentDidMount() {
		window.addEventListener("resize", this.adjustHeight);
		this.adjustHeight();
	},

	adjustHeight() {
		var elem = document.getElementById("scrollcontainer");
		var win = window.innerHeight;
		var top = elem.getBoundingClientRect().top;
        var available = win-top;
		//console.log("set height to "+win+"-"+top+": "+available);
		elem.style.height = available+"px";
	},


	render(){
		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<div id="scrollcontainer">
				{ this.props.songs && this.props.songs.length ?
					this.props.songs.map(songObj =>
						<SongListEntry key={songObj.id} song={songObj} score={0} voted="" handle={this.props.handle} view={this.props.view} />
					)
				  : this.props.selection && this.props.selection.length ?
					this.props.selection.map(songId => {
						const songObj = this.props.songs[songId];
						// console.log(songObj);
						return <SongListEntry
							key={songId}
							song={songObj.track}
							score={songObj.score}
							voted={songObj.voted}
							handle={this.props.handle}
							view={this.props.view} />
					})
				  :
                    <div className="error">
                        <p className="error-warning"> { this.props.view == 'wish' ? "DJ shuffle is on the turn tables ... " : "No results could be found ..."} </p>
                    </div>



				}
				</div>
            </div>
		)
	}

});

module.exports = SongList;