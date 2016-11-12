var React = require('react');



var CurrentSong = React.createClass({

	
	
	/*handleClick(){
		this.props.onClick(this.props.address);
	},*/
	
	

	render(){
		return (

		<div className="panel panel-default">
			<div className="panel-body">
				<div className="text-left">Now playing:</div>
				<div className="col-xs-3 center">
					<img src="assets/equalizer.gif" height="42" width="42"></img>
				</div>
				<div className="col-xs-3">
				<div>Artist:</div>
				<div>Title:</div>
				</div>
				<div className="col-xs-6">
					<div>{this.props.song.artistName}</div>
					<div>{this.props.song.name}</div>
				</div>

			</div>
		</div>


		)

	}

});

module.exports = CurrentSong;
