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
                <a className="list-group-item" onClick={this.handleClick} id="myplaylist">
                    Meine Playlist
                </a>
                <a className="list-group-item" onClick={this.handleClick}>
                    XXXX
                </a>
                <a className="list-group-item" onClick={this.handleClick}>
                    XXXX
                </a>
            </div>
        )

    }

});

module.exports = MenuList;