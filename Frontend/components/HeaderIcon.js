/**
 * Created by alexa on 12.11.2016.
 */
var React = require('react');


var HeaderIcon = React.createClass({
    headerIconStyle : {
        height: '100%',
        marginTop: '10px'
    },

    handleToggle: function(evt){
        evt.preventDefault();
        slideout.toggle();
    },

    render(){
        return (
            <div className="col-xs-3 col-md-3" style={this.headerIconStyle} onClick={this.handleToggle}>
                <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
            </div>
        )
    }

});

module.exports = HeaderIcon;
