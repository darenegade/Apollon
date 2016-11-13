var React = require('react');


const ImageStyle = {
	height: '123px',
	width: '110px',
};
function IconVoteStyle(a, b) {
	return {
		margin: '5px',
		fontSize: '3em',
		color: arguments.length && a == b ? 'red' : ''
	};
}

var SongListEntry = React.createClass({

	makeClickHandler(value) {
		return (e) => {
			e.preventDefault();
			this.props.handle(this.props.song.id, value);
		};
	},

	render(){
		return (

		<div className="panel panel-default">

			<div className="panel-body">
				<div className="col-xs-4 col-md-4 no-padding">
					<img src={this.props.song.imageUrl} style={ImageStyle} />
				</div>
				<div className="col-xs-8 col-md-8 no-padding">
					<div className="col-xs-8 col-md-8 no-padding">
						<div className="artist-name">{this.props.song.artistName}</div>
						<div className="song-name">{this.props.song.name}</div>
						<div className="smalltext">{this.props.song.albumName}</div>
					</div>
					{
						this.props.view == "wish" ?
							<div className="col-xs-4 col-md-4">
								<span>{this.props.score}</span>
								<i onClick={this.makeClickHandler(+1)} className="fa fa-heart-o fa-2x" style={IconVoteStyle(this.props.voted, "UP")} aria-hidden="true"></i>
								<i onClick={this.makeClickHandler(-1)} className="fa fa-thumbs-o-down fa-2x" style={IconVoteStyle(this.props.voted, "DOWN")} aria-hidden="true"></i>
							</div>
						: this.props.view == "wish-admin" ?
							<div className="col-xs-4 col-md-4">
								<span>{this.props.score}</span>
								<i onClick={this.makeClickHandler(+1)} className="fa fa-heart-o fa-2x" style={IconVoteStyle(this.props.voted, "UP")} aria-hidden="true"></i>
								<i onClick={this.makeClickHandler(-1)} className="fa fa-thumbs-o-down fa-2x" style={IconVoteStyle(this.props.voted, "DOWN")} aria-hidden="true"></i>
							</div>
						: this.props.view == "browse" ?
							<div className="col-xs-4 col-md-4">
								<i onClick={this.makeClickHandler(+1)} className="fa fa-heart-o fa-2x" style={IconVoteStyle()} aria-hidden="true"></i>
							</div>
						: this.props.view == "browse-admin" ?
							<div className="col-xs-4 col-md-4">
								<i onClick={this.makeClickHandler(+1)} className="fa fa-heart-o fa-2x" style={IconVoteStyle()} aria-hidden="true"></i>
							</div>
						: <div className="col-xs-4 col-md-4"></div>
					}
				</div>
			</div>
		</div>
		)
	}
});

module.exports = SongListEntry;