var React = require('react');

var Search = React.createClass({

	getInitialState() {
		return { value: '' };
	},

	handleChange(event) {
		this.setState({value: event.target.value});
	},

	handleSubmit(event){
		event.preventDefault();
		this.props.onComplete(this.state.value);

		// Unfocus the text input field
		this.getDOMNode().querySelector('input').blur();
	},

	render() {

		return (
			<form id="login_form" className="form-horizontal" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<div className="col-xs-12 col-md-6 col-md-offset-3">
						<div className="input-group">
							<input type="text" className="form-control" id="adminkey" placeholder="Your access key" 
							value={this.state.value} onChange={this.handleChange} />
							<span className="input-group-btn">
								<span className="glyphicon glyphicon-arrow-right"></span>
							</span>
						</div>
						<div>{this.props.message}</div>
					</div>
				</div>
			</form>
		);

	}
});

module.exports = Search;