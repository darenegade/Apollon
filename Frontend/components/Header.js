
var React = require('react');
var HeaderIcon = require('./HeaderIcon');

var Header = React.createClass({

    headerIconStyle : {
        height: '100%',
        marginTop: '10px'
    },

    handleToggle: function(evt){
        evt.preventDefault();
        slideout.toggle();
    },

    render(){
        const headerStyle = {
            //position: 'fixed',
            width: '100%',
            height: '65px',
            marginBottom: '10px'

        };
        const headerItemStyle = {
            height: '100%',
            marginTop: '5px',
            fontSize: '40px'
        };

        return (
            <header style={headerStyle}>
                <div className="col-xs-12 col-md-12 header-container">
                    <button className="btn btn-default apollon-button" id="apollon-button" style={this.headerIconStyle} onClick={this.handleToggle}>
                        <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
                    </button>
                    <img className="logo-img" src="../img/apollon_schriftzug.png"/>
                </div>
            </header>
        )
    }
});

module.exports = Header;