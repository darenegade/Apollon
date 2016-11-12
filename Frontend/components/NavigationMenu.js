/**
 * Created by alexa on 12.11.2016.
 */
var React = require('react');

var NavigationMenu = React.createClass({

    handleClick(e){
        this.props.handleSelection(e.currentTarget.id)
    },

    render(){
        return (
            <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                <a className="list-group-item" onClick={this.handleClick} id="search">
                    Search
                </a>
                <a className="list-group-item" onClick={this.handleClick} id="browse">
                    Browse
                </a>
                <a className="list-group-item" onClick={this.handleClick} id="wishlist">
                    Wishlist
                </a>
                <a className="list-group-item" onClick={this.handleClick} id="current">
                    Current
                </a>
            </div>
        )
    }

});

module.exports = NavigationMenu;