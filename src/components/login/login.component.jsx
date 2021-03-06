import React from "react";

import { signIn } from "../../firebase/firebase.utils";

import "./login.styles.scss";

class LoginComponent extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.checkLogin = this.checkLogin.bind(this);

		this.state = {
			username: "",
			password: "",
			error: "",
		};
	}

	handleChange(event) {
		const { value, name } = event.target;

		this.setState({
			[name]: value,
		});
	}

	async checkLogin(event) {
		event.preventDefault();

		const { username, password } = this.state;
		try {
			const signInData = await signIn(username.toLowerCase(), password);

			if (signInData.name) {
				this.props.setUserLoggedIn(signInData.name);
			}
			return signInData;
		} catch (error) {
			this.setState({ error });
		}
		// else {
		// 	this.props.setUserLoggedIn(null);
		// 	alert("Invalid username or password.");
		// }
	}

	componentDidMount() {
		const myStorage = window.localStorage;

		const alreadyLoggedIn = myStorage.getItem("name");

		if (alreadyLoggedIn) {
			this.props.setUserLoggedIn(alreadyLoggedIn);
		} else return;
	}

	render() {
		const { username, password, error } = this.state;

		return (
			<div className="login">
				<h2>Login</h2>
				<form onSubmit={this.checkLogin} className="login-form">
					<input
						className="login-form--username"
						type="text"
						name="username"
						placeholder="Username"
						value={username}
						onChange={this.handleChange}
					/>
					<input
						className="login-form--password"
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={this.handleChange}
					/>
					<div className="login-creds">Username: Tester</div>
					<div className="login-creds">Password: 123456</div>
					<div style={{ color: "red", fontStyle: "italic", fontSize: 25 }}>{error.toString()}</div>
					<input className="login-form--login-btn" type="submit" value="Login" />
				</form>
			</div>
		);
	}
}

export default LoginComponent;
