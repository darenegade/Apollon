var React = require('react');

var Search = require('./Search');
var NavigationMenu = require('./NavigationMenu');
var HeaderIcon = require('./HeaderIcon');
var CurrentSong = require('./CurrentSong');
var SongList = require('./Songlist');

var App = React.createClass({

    testaddress:"http://131.159.211.242:8080/api",

	getInitialState(){
		return {
            currentView: "wishlist",
            playlist: [],
            wishlist:[],
        }
	},

    componentDidMount() {
        this.loadPlaylist();
        this.loadWishlist();
    },

	setView(view) {
		this.setState({
			currentView: view
		});
	},

    loadPlaylist() {
        //console.log("loading playlist");
        this.request(this.testaddress+"/playlist").then(result => {
            this.setState({
                playlist: result
            });
            //console.log("fetched playlist");
        }, err => {
            console.error(err);
        });
    },

    loadWishlist() {
        this.request(this.testaddress+"/playlist/wishlist").then(result => {
            this.setState({
                wishlist: result
            });
            //console.log("fetched wishlist");
        }, err => {
            console.error(err);
        });
    },

    request(url) {
        var headers = new Headers();
        return Creed.timeout(2000, fetch(url, {
            cors: true,
            headers: headers
        })
		.then(function(response) {
			if (response.ok)
				return response.json();
			throw new Error("Network error: "+response.status);
		}));
    },

	render(){
        const headerStyle = {
            //position: 'fixed',
            width: '100%',

        };
		const headerItemStyle = {
			height: '100%',
			marginTop: '5px',
			fontSize: '40px'
		};
		return (
		    <div>
                <nav id="menu">
					<NavigationMenu handleSelection={this.setView} />
				</nav>
                <main id="panel">
                    <header style={headerStyle}>
                        <div className="col-xs-12 col-md-12 header-container">
                            <HeaderIcon/>
                            <div className="col-xs-8 col-md-8"><h1 className="heading-apollon" style={headerItemStyle}>Apollon</h1></div>
                        </div>
                    </header>
                    {(()=>{
						// console.log("rendering", this.state)
						switch(this.state.currentView) {
							case "search":
								return <Search onSearch={this.loadPlaylist} />;
							case "current":
								return <CurrentSong />;
							case "browse":
							    return <Playlist songs={this.state.playlist} view={this.state.currentView} />;
							case "wishlist":
                                return <Playlist songs={this.state.wishlist} view={this.state.currentView} />;
							default:
								console.error("no view for "+this.state.currentView);
								return null;
						}
					})()}
                </main>
            </div>
		);
	}
});

module.exports = App;