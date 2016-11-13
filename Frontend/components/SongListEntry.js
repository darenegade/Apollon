var React = require('react');

const PanelDefaultStyle = {
	boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};
 const ImageStyle = {
	 height: '123px',
	 width: '110px',
 };

 const IconVoteStyle = {
	 margin: '5px',
	 fontSize: '3em'
 }
var SongListEntry = React.createClass({

	render(){
		return (

		<div className="panel panel-default" style={PanelDefaultStyle}>
			<div className="panel-body">
				<div className="col-xs-4 col-md-4 no-padding">
					<img url={this.props.song.imageUrl} />
					<img src="https://upload.wikimedia.org/wikipedia/en/2/27/Justin_Bieber_-_Purpose_(Official_Album_Cover).png" style={ImageStyle}/>
				</div>
				<div className="col-xs-8 col-md-8 no-padding">
					<div className="col-xs-8 col-md-8 no-padding">
						<div className="artist-name">{this.props.song.artistName}</div>
						<div className="song-name">{this.props.song.name}</div>
						<div className="smalltext">{this.props.song.albumName}</div>
					</div>
					<div className="col-xs-4 col-md-4">
						<i className="fa fa-heart-o fa-2x" aria-hidden="true" style={IconVoteStyle}></i>
						<i className="fa fa-thumbs-o-down fa-2x" style={IconVoteStyle} aria-hidden="true"></i>
					</div>
				</div>
			</div>
		</div>


		)

	}

});

module.exports = SongListEntry;
