/**
 * Created by alexa on 12.11.2016.
 */
var React = require('react');

var NavigationPanel = React.createClass({
    render(){
        return (
            <main id="panel">
                <header>
                    <button className="toggle-button">☰</button>
                    <h2>Panel</h2>
                </header>
            </main>
        )
    }
});

module.exports = NavigationPanel;