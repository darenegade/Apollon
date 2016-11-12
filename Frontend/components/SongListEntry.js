var React = require('react');
var SongListEntry = require('./SongListEntry');


var SongListEntry = React.createClass({

	render(){
		return (

		<div className="panel panel-default">
			<div className="panel-body">
				<img url={this.props.song.imageUrl} />
				<div className="col-xs-3">
				<div>Artist:</div>
				<div>Title:</div>
				<div className="smalltext">"Album:"</div>
				</div>
				<div className="col-xs-6">
					<div>{this.props.song.artistName}</div>
					<div>{this.props.song.name}</div>
					<div className="smalltext">{this.props.song.albumName}</div>
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
