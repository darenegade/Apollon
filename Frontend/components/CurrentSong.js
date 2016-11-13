var React = require('react');


var CurrentSong = React.createClass({

    PanelDefaultStyle: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        height: '86px',
        width: '100%'
    },
    ImageStyle: {
        height: '86px',
        width: '86px',
    },

    render(){
        return <div className="panel panel-default" style={this.PanelDefaultStyle}>
            <div className="panel-body">
                <div className="col-xs-3 col-md-3 no-padding">
                    <img src={this.props.song.imageUrl} style={this.ImageStyle}/>
                </div>
                <div className="col-xs-9 col-md-9 no-padding">
                    <div className="col-xs-8 col-md-8 no-padding">
                        <div className="artist-current">{this.props.song.artistName}</div>
                        <div className="song-current">{this.props.song.name}</div>
                    </div>
                    <div className="col-xs-3 col-md-3 no-padding">

                        <img src="/img/equalizer.gif" style={this.ImageStyle} ></img>
                    </div>
                </div>
            </div>
        </div>
    }

});

module.exports = CurrentSong;
