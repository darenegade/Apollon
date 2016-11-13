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
            currentView: "search",
            playlist: [],
            searchresult: [],
            wishlist: [],
			wishes: {},
			currentSong: null
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
			for (var id in result.wishlist)
				result.wishlist[id].score = result.wishlist[id].up - result.wishlist[id].down;
            this.setState({
                wishlist: this.getWishlist(result.wishlist),
				wishes: result.wishlist,
				currentSong: result.currentSong
            });
            console.log("fetched wishlist");
        }, err => {
            console.error(err);
        });
    },

    loadSearchResults(searchtext) {
        console.log("loading searchresults for: "+searchtext);
        this.request(this.testaddress+"/playlist/search?name="+searchtext).then(result => {
            this.setState({
                searchresult: result
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

	vote(songId, vote) {
		console.log(typeof songId);
		fetch(this.testaddress+"/playlist/vote"+{"-1":"down", "1":"up"}[vote], {
			method: "POST",
			body: songId // JSON.stringify(songId)
		})
		.then(response => response.text())
		.then(console.log.bind(console, "voted"), console.error)
	},
	
	getWishlist(wishes) {
		return Object.keys(wishes).sort((a, b) => {
			wishes[a].score - wishes[b].score;
		})
	},
	
	updateWish(w) {
		var wishes = this.state.wishes;
		wishes[w.track.id] = w;
		w.score = w.up - w.down;
		this.setState({
			wishlist: this.getWishlist(wishes)
		})
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
								return <div>
                                    <Search onSearch={this.loadSearchResults} />
                                    <SongList songs={this.state.searchresult} view="browse" handle={this.vote} />;
                                </div>;
							case "current":
								return <CurrentSong song={this.state.currentSong} />;
							case "browse":
							    return <SongList songs={this.state.playlist} view="browse" handle={this.vote} />;
							case "wishlist":
                                return <div>
                                    <CurrentSong song={this.state.currentSong} />
									<SongList songs={this.state.wishes} selection={this.state.wishlist} view="wish" handle={this.vote} />
								</div>;
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