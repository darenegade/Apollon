var React = require('react');

var Search = require('./Search');
var NavigationMenu = require('./NavigationMenu');
var Header = require('./Header');
var CurrentSong = require('./CurrentSong');
var SongList = require('./Songlist');
var FullScreenCurrent = require('./CurrentSongFullScreen');

var App = React.createClass({

    testaddress:"http://131.159.211.242:8080/api",
    addressJuke:"http://131.159.211.242:8080/juke",

	getInitialState(){
		return {
            currentView: "wishlist",
            wishlist:[],
            searchresult:[],
            searchresultJuke:[],
			wishes: {},
			currentSong: null

        }
	},

    componentDidMount() {
        this.loadPlaylist();
        this.loadWishlist();
		this.events = new EventSource(this.testaddress+"/playlist/stream");
		this.events.onmessage = event => {
			console.log(event);
			var data = JSON.parse(event.data);
			if (event.lastEventId == "CurrentTrack") {
				delete this.state.wishes[data.id];
				this.setState({
					currentSong: data,
					wishlist: this.getWishlist(this.state.wishes)
				});
			} else if (event.lastEventId == "Wishlist") {
				this.updateWish(data);
			}
		};
    },

	componentWillUnmount() {
		this.events.close();
	},

	setView(view) {
		this.setState({
			currentView: view
		});
	},

    loadPlaylist() {
        console.log("loading playlist initially");
        this.request(this.testaddress+"/playlist").then(result => {
            this.setState({
                searchresult:result
            });
            console.log("fetched playlist initially");
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
        console.log("loading searchresults local for: "+searchtext);
        this.request(this.testaddress+"/playlist/search?name="+searchtext).then(result => {

            this.setState({
                searchresult: result
            });
            console.log("fetched searchresult from local");
        }, err => {
            console.error(err);
        });
    },

    loadJukeResults(searchtext) {
        console.log("loading searchresults from juke for: "+searchtext);
        //http://131.159.211.242:8080/juke/track-search?criterion=beyonce&pageIndex=0
        this.request(this.addressJuke+"/track-search?criterion="+searchtext+"&pageIndex=0").then(result => {
            console.log(result);
            var tracks =result.tracks;
            tracks.forEach(function(entry) {
                //http://artwork.cdn.247e.com/covers/68218472/128x128
                entry["imageUrl"] = "http://artwork.cdn.247e.com/covers/"+entry.id+"/128x128";
            });
            this.setState({
                searchresultJuke: tracks
            });
            console.log("fetched searchresult from juke");
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
		fetch(this.testaddress+"/playlist/vote"+{"-1":"down", "1":"up"}[vote], {
			method: "POST",
			body: songId // JSON.stringify(songId)
		})
		.then(response => response.text())
		//.then(console.log.bind(console, "voted"), console.error)
		.catch(console.error)
	},
	
	getWishlist(wishes) {
		return Object.keys(wishes).sort((a, b) => {
			return wishes[b].score - wishes[a].score;
		})
	},
	
	updateWish(w) {
		var wishes = this.state.wishes;
		wishes[w.track.id] = w;
		w.score = w.up - w.down;
		console.log("updated", w, wishes)
		this.setState({
			wishlist: this.getWishlist(wishes)
		})
	},



	render(){

		return (
		    <div>
                <nav id="menu">
					<NavigationMenu handleSelection={this.setView} />
				</nav>
                <main id="panel">
                    <Header/>
                    {(()=>{
						console.log("rendering", this.state)
						switch(this.state.currentView) {


							case "current":
								return <FullScreenCurrent song={this.state.currentSong} />;
							case "browse":
                                return <div>
                                    <Search onSearch={this.loadSearchResults} />
                                    <SongList songs={this.state.searchresult} view="browse" handle={this.vote} />;
                                </div>;
                            case "buy":
                                return <div>
                                    <Search onSearch={this.loadJukeResults} />
                                    <SongList songs={this.state.searchresultJuke} view="buy" handle={this.vote} />;
                                </div>;

							case "wishlist":
                                return <div>
                                        <CurrentSong song={this.state.currentSong} />
                                        <SongList songs={this.state.wishes} selection={this.state.wishlist} view="wish" handle={this.vote} />
                                    </div>

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