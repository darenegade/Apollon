var React = require('react');


var CurrentSong = React.createClass({

    PanelDefaultStyle: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    ImageStyle: {
        height: '123px',
        width: '110px',
    },


    render(){
        <div className="panel panel-default" style={this.PanelDefaultStyle}>

            <div className="panel-body">
                <div className="col-xs-4 col-md-4 no-padding">
                    <img src={this.props.song.imageUrl} style={this.ImageStyle}/>
                </div>
                <div className="col-xs-8 col-md-8 no-padding">
                    <div className="col-xs-8 col-md-8 no-padding">
                        <div className="artist-name">{this.props.song.artistName}</div>
                        <div className="song-name">{this.props.song.name}</div>
                        <div className="smalltext">{this.props.song.albumName}</div>
                    </div>
                </div>
                <div className="col-xs-4 col-md-4">
                    <img src="/img/equalizer.gif" style={this.ImageStyle} ></img>

                </div>
            </div>
        </div>
    }

});

module.exports = CurrentSong;
