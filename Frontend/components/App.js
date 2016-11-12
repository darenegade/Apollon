var React = require('react');

var Search = require('./Search');
var NavigationMenu = require('./NavigationMenu');
var HeaderIcon = require('./HeaderIcon');
var CurrentSong = require('./CurrentSong');
var Playlist = require('./Songlist');

var App = React.createClass({

	getInitialState(){
		return {
            currentView: "whishlist",
            playlist: [],
        }
	},

    componentDidMount() {
        this.loadPlaylist();
    },

	setView(view) {
		this.setState({
			currentView: view
		});
	},

    loadPlaylist() {
        this.request("/playlist").then(result => {
            this.setState({
                playlist: result
            });
        }, err => {
            console.error(err);
            this.setState({
                credentials: null,
                loginmessage: err.message
            });
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
						switch(this.state.currentView) {
							case "search":
								return <Search onSearch={this.searchForAddress} />;
							case "current":
								return <CurrentSong />;
							case "browse":
							    return <Playlist songs={this.state.playlist} />
							case "wishlist":
							default:
								return <Playlist songs={[]} />;
						}
					})()}
                </main>
            </div>
		);
	}
});

module.exports = App;