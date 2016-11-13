
var React = require('react');
var HeaderIcon = require('./HeaderIcon');

var Header = React.createClass({
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
            <header style={headerStyle}>
                <div className="col-xs-12 col-md-12 header-container">
                    <HeaderIcon/>
                    <img className="logo-img" src="../img/apollon_schriftzug.png"/>
                </div>
            </header>
        )
    }
});

module.exports = Header;