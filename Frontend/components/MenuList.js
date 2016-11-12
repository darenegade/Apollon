/**
 * Created by alexa on 12.11.2016.
 */
var React = require('react');
var MenuListItem = require('./MenuListItem');

var MenuList = React.createClass({

    handleClick(element){
        switch (element.id) {
            case "myplaylist":
        }
        console.log("LALAL");
    },

    render(){
        return (
            <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                <a className="list-group-item" onClick={this.handleClick} id="">
                    Search
                </a>
                <a className="list-group-item" onClick={this.handleClick} id="playlist">
                    Browse Playlist
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

module.exports = MenuList;