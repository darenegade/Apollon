var React = require('react');

var Search = require('./Search');
var NavigationMenu = require('./NavigationMenu');
var HeaderIcon = require('./HeaderIcon');
var CurrentSong = require('./CurrentSong');
var SongList = require('./SongList');

var App = React.createClass({

	getInitialState(){
		return {
            currentView: "whishlist"
        }
	},

	setView(view) {
		this.setState({
			currentView: view
		});
	},

	render(){
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
                    <header>
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
							case "wishlist":
							default:
								return <SongList songs={[]} />;
						}
					})()}
                </main>
            </div>
		);
	}
});

module.exports = App;