var React = require('react');


var CurrentSongFullScreen = React.createClass({

    PanelDefaultStyle: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        height: '87%'
    },
    ImageStyle: {
        height: '256px',
        width: '256px',
        marginTop: '35px',
        marginBottom: '5px'
    },
    CenterStyle: {
        textAlign: 'center',
    },
     FullScreenStyle: {
        width: '100%',
    },
    JukeStyleImg: {
        width: '64px',
        height: '64px'
    },
    JukeStyle: {
       marginTop: '30px',
    },

    render(){
        return <div className="container height-full">
            <div className="panel panel-default" style={this.PanelDefaultStyle}>
                <div className="panel-body">
                    <div className="col-xs-12 col-md-12  no-padding">
                        <img src={this.props.song.imageUrl} style={this.ImageStyle}/>
                    </div>
                    <div className="col-xs-12 col-md-12 no-padding">
                        <div className="col-xs-8 col-md-8 no-padding" style={this.FullScreenStyle}>
                            <div className="artist-name" style={this.CenterStyle}>{this.props.song.artistName}</div>
                            <div className="song-name" style={this.CenterStyle}>{this.props.song.name}</div>
                            <div className="smalltext" style={this.CenterStyle}>{this.props.song.albumName}</div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-12 no-padding" style={this.JukeStyle}>
                        <div className="col-xs-5 col-md-5 no-padding">
                            <a href="https://juke.com/de/de/music"> <img src="../img/unnamed.png" href="https://juke.com/de/de/music" style={this.JukeStyleImg}/></a>
                        </div>
                        <div className="col-xs-6 col-md-6 no-padding">
                            <div>
                                <a className="infoTextJuke" href="https://juke.com/de/de/music">
                                    click here to buy this song! <i class="fa fa-music" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

    }

});

module.exports = CurrentSongFullScreen;
