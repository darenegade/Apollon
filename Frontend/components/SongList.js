var React = require('react');
var SongListEntry = require('./SongListEntry');

var SongList = React.createClass({

	/**
	 * React standard method to define components initial state.
	 */
	getInitialState: function () {
		return {
			songs: [
				{
					artist:'Jimi Hendrix',
					title:'Little wing',
					album:'Are you experienced',

				},
				{
					artist:'Jimi Hendrix',
					title:'Little wing2',
					album:'Are you experienced',

				},
				{
					artist:'Jimi Hendrix',
					title:'Little wing3',
					album:'Are you experienced',

				}
			]
		};
	},

	/*song:{
		artist:'Jimi Hendrix',
		title:'Little wing',
		album:'Are you experienced',

	},*/

	render(){
		var songEntrys=[];
		this.state.songs.forEach(function (songObj,index){
			songEntrys.push(
				<SongListEntry song={songObj}/>
			)},this);


		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				{songEntrys}
			</div>
		)

	}

});

module.exports = SongList;