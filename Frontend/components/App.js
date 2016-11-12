var React = require('react');

var Search = require('./Search');
var NavigationMenu = require('./NavigationMenu');
var HeaderIcon = require('./HeaderIcon');

var App = React.createClass({

	getInitialState(){
		return {
            currentview: "index"
        }
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
					<NavigationMenu />
				</nav>
                <main id="panel">
                    <header>
                        <div className="col-xs-12 col-md-12 header-container">
                            <HeaderIcon/>
                            <div className="col-xs-8 col-md-8"><h1 className="heading-apollon" style={headerItemStyle}>Apollon</h1></div>
                        </div>
                    </header>
                    {
                        <Search onSearch={this.searchForAddress} />
                    }
                </main>
            </div>
		);
	}
});

module.exports = App;