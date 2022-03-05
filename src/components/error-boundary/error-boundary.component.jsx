import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			errorMessage: null,
		};
	}

	componentDidCatch(errorMessage) {
		this.setState({
			hasError: true,
			errorMessage,
		});
	}

	render() {
		if (this.state.hasError) {
			return this.state.errorMessage.toString();
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
