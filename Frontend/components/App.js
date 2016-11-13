var React = require('react');

var Search = require('./Search');
var NavigationMenu = require('./NavigationMenu');
var Header = require('./Header');
var CurrentSong = require('./CurrentSong');
var SongList = require('./Songlist');
var FullScreenCurrent = require('./CurrentSongFullScreen');

var App = React.createClass({

    testaddress:"http://131.159.211.242:8080",

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
        this.loadSearchResults("");
        this.loadWishlist();
		this.events = new EventSource(this.testaddress+"/api/playlist/stream");
		this.events.onmessage = this.handleEvent;
    },

	componentWillUnmount() {
		this.events.close();
	},

	setView(view) {
		this.setState({
			currentView: view
		});
	},

	handleEvent(event) {
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
	},

    loadWishlist() {
        this.request(this.testaddress+"/api/playlist/wishlist").then(result => {
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

    loadSearchResults(search) {
        console.log("loading local results for '"+search+"'");
        this.request(this.testaddress+"/api/playlist" + (search ? "/search?name="+search : "")).then(result => {
            this.setState({
                searchresult: result.map(song => {
					if (song.id in this.state.wishes)
						return this.state.wishes[song.id];
					return {
						track: song,
						score: 0,
						voted: "NOT"
					};
				})
            });
            console.log("fetched searchresult from local");
        }, err => {
            console.error(err);
        });
    },

    loadJukeResults(searchtext) {
        console.log("loading searchresults from juke for: "+searchtext);
        //http://131.159.211.242:8080/juke/track-search?criterion=beyonce&pageIndex=0
        this.request(this.testaddress+"/juke/track-search?criterion="+searchtext+"&pageIndex=0").then(result => {
            this.setState({
                searchresultJuke: result.tracks.map(function(entry) {
					entry["imageUrl"] = "http://artwork.cdn.247e.com/covers/"+entry.id+"/128x128";
					return {
						track: entry,
						score: 0,
						voted: "NOT"
					};
				})
            });
            console.log("fetched searchresult from juke", result);
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
		fetch(this.testaddress+"/api/playlist/vote"+{"-1":"down", "1":"up"}[vote], {
			method: "POST",
			body: songId // JSON.stringify(songId)
		})
		.then(response => response.text())
		//.then(console.log.bind(console, "voted"), console.error)
		.catch(console.error)
	},

	getWishlist(wishes) {
		return Object.keys(wishes).map(k => wishes[k]).sort((a, b) => {
			return b.score - a.score;
		})
	},

	updateWish(w) {
		var wishes = this.state.wishes;
		wishes[w.track.id] = w;
		w.score = w.up - w.down;
		console.log("updated", w, wishes)
		this.setState({
			wishlist: this.getWishlist(wishes),
			searchresult: this.state.searchresult.map(entry =>
				entry.track.id == w.track.id ? w : entry
			)
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
                                    <Search onSearch={this.loadSearchResults} placeholder="Search for Songs..." />
                                    <SongList selection={this.state.searchresult} view="browse" handle={this.vote} />
                                </div>;
                            case "buy":
                                return <div>
                                    <Search onSearch={this.loadJukeResults} placeholder="Search for Songs on JUKE!" />
                                    <SongList selection={this.state.searchresultJuke} view="buy" />
								</div>;
							case "wishlist":
								return <div>
									<CurrentSong song={this.state.currentSong} />
									<SongList selection={this.state.wishlist} view="wish" handle={this.vote} />
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