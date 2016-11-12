var React = require('react');
var SongListEntry = require('./SongListEntry');


var SongListEntry = React.createClass({

	render(){
		return (

		<div className="panel panel-default">
			<div className="panel-body">
				<div className="col-xs-3">
				<div>Artist:</div>
				<div>Title:</div>
				<div className="smalltext">"Album:"</div>
				</div>
				<div className="col-xs-6">
					<div>{this.props.song.artist}</div>
					<div>{this.props.song.title}</div>
					<div className="smalltext">{this.props.song.album}</div>
				</div>
				<div className="col-xs-3 center">
					<h1>
					<span className="glyphicon glyphicon-heart"></span>
					<span className="glyphicon glyphicon-play"></span>
					</h1>
				</div>
			</div>
		</div>


		)

	}

});

module.exports = SongListEntry;
