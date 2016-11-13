/**
 * Created by alexa on 12.11.2016.
 */
var React = require('react');

var NavigationMenu = React.createClass({

    handleClick(e){
        this.props.handleSelection(e.currentTarget.id);
        slideout.close();
    },

    render(){
        const OrangeStyle = {
            color: '#2c3e50',
            paddingRight: '5px'
        };
        const ListElementStyle = {
            color: '#555555',
            borderBottom: '1px solid lightgrey',
            height: '60px'
        };
        return (
            <div className="list-group menu-list col-xs-12 col-md-6 col-md-offset-3 no-padding">
                <a className="list-group-item menu-list-heading">Menu</a>
                <a className="list-group-item menu-list-item" onClick={this.handleClick} id="search" style={ListElementStyle}>
                    <i className="fa fa-search" aria-hidden="true" style={OrangeStyle}></i> Search
                </a>
                <a className="list-group-item menu-list-item" onClick={this.handleClick} id="browse" style={ListElementStyle}>
                    <i className="fa fa-music" aria-hidden="true" style={OrangeStyle}></i> The Playlist
                </a>
                <a className="list-group-item menu-list-item" onClick={this.handleClick} id="wishlist" style={ListElementStyle}>
                    <i className="fa fa-line-chart" aria-hidden="true" style={OrangeStyle}></i>  Wishlist
                </a>
                <a className="list-group-item menu-list-item" onClick={this.handleClick} id="current" style={ListElementStyle}>
                    <i className="fa fa-volume-up" aria-hidden="true" style={OrangeStyle}></i> Current
                </a>
            </div>
        )
    }

});

module.exports = NavigationMenu;