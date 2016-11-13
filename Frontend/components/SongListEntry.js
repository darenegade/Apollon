var React = require('react');


const ImageStyle = {
	height: '123px',
	width: '110px',
};

const CountStyle = {
	marginLeft: '50%',
	fontSize: '1.1em'
};

function IconVoteStyle(a, b) {
	return {
		margin: '5px',
		fontSize: '2.5em',
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
				<div className="col-xs-4 col-md-4 col-lg-7 no-padding">
					<img src={this.props.song.imageUrl} style={ImageStyle} />
				</div>
				<div className="col-xs-8 col-s-8 col-md-8 cd-lg-5 no-padding">
					<div className="col-xs-7 col-md-7 col-lg-7 no-padding">
						<div className="artist-name">{this.props.song.artistName}</div>
						<div className="song-name">{this.props.song.name}</div>
						<div className="smalltext">{this.props.song.albumName}</div>
					</div>
					{
						this.props.view == "wish" ?
							<div className="col-xs-4 col-s-4 col-md-4 col-lg-7">
								<span style={CountStyle}>{(this.props.score>0 ? "+" : "") + this.props.score}</span>
								<button className="icon-button" onClick={this.makeClickHandler(+1)}>
									<i className="fa fa-heart-o fa-2x" style={IconVoteStyle(this.props.voted, "UP")} aria-hidden="true"></i>

								</button>
								<button className="icon-button" onClick={this.makeClickHandler(-1)}>
									<i className="fa fa-thumbs-o-down fa-2x" style={IconVoteStyle(this.props.voted, "DOWN")} aria-hidden="true"></i>
								</button>
							</div>
						: this.props.view == "wish-admin" ?
							<div className="col-xs-4 col-s-4 col-md-4 col-xs-4 col-md-4 col-lg-7">
								<span style={CountStyle}>{(this.props.score>0 ? "+" : "") + this.props.score}</span>
								<button className="icon-button" onClick={this.makeClickHandler(+1)}>
									<i className="fa fa-heart-o fa-2x" style={IconVoteStyle(this.props.voted, "UP")} aria-hidden="true"></i>
								</button>
								<button className="icon-button" onClick={this.makeClickHandler(-1)}>
									<i className="fa fa-thumbs-o-down fa-2x" style={IconVoteStyle(this.props.voted, "DOWN")} aria-hidden="true"></i>
								</button>
							</div>
						: this.props.view == "browse" ?
							<div className="col-xs-4 col-s-4 col-md-4 col-xs-4 col-md-4 col-lg-7">
								<button className="icon-button" onClick={this.makeClickHandler(+1)}>
									<i className="fa fa-heart-o fa-2x" style={IconVoteStyle(this.props.voted, "UP")} aria-hidden="true"></i>
								</button>
							</div>
						: this.props.view == "browse-admin" ?
							<div className="col-xs-4 col-s-4 col-md-4 col-xs-4 col-md-4 col-lg-7">
								<button className="icon-button" onClick={this.makeClickHandler(+1)}>
									<i className="fa fa-heart-o fa-2x" style={IconVoteStyle(this.props.voted, "UP")} aria-hidden="true"></i>
								</button>
							</div>
						: this.props.view == "buy" ?
							<div className="col-xs-4 col-s-4 col-md-4 col-xs-4 col-md-4 col-lg-7">
								<i onClick={this.makeClickHandler(+1)} className="fa fa-plus fa-2x" aria-hidden="true"></i>
							</div>
						: <div className="col-xs-4 col-s-4 col-md-4 col-xs-4 col-md-4 col-lg-7"></div>

					}
				</div>
			</div>
		</div>
		)
	}
});

module.exports = SongListEntry;
