/**
 * Created by alexa on 12.11.2016.
 */
var React = require('react');

const headerIconStyle = {
    height: '100%',
    marginTop: '10px'
};

var HeaderIcon = React.createClass({

    getInitialState: function(){
        return ({
            toggleOn: false
        });
    },


    handleToggle: function(evt){
        evt.preventDefault();
        console.log('The link was clicked.');
        slideout.toggle();
        //var nextState = !this.state.toggleOn;
        //this.setState({toggleOn: nextState});
    },

    render(){
        return (
            <div className="col-xs-3 col-md-3" style={headerIconStyle} onClick={this.handleToggle}>
                <i className="fa fa-music fa-2x" aria-hidden="true"></i>
            </div>
        )
    }

});

module.exports = HeaderIcon;
