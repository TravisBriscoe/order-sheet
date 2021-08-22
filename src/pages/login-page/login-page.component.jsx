import React from 'react';

import LoginComponent from '../../components/login/login.component';
// import NewUserComponent from '../../components/new-user/new-user.component';

import './login-page.styles.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    // this.handleChange = this.handleChange.bind(this);
    // this.checkLogin = this.checkLogin.bind(this);

    this.state = {
      users: this.props.users,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    }
  }

  // handleChange(event) {
  //   const { value, name } = event.target;
    
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // checkLogin(event) {
  //   event.preventDefault();

    // const { username, password } = this.state;
    // const userData = signIn(username, password)

    // this.props.setUserLoggedIn(true, userData.name);
  //   const { users, username, password } = this.state;

  //   console.log(users[username])

  //   if (!users[username]) {
  //     alert('Username or password does not match! Please try again');
  //     return this.setState({ username: '', password: '' });
  //   }      
  //   if (users[username].name === username && users[username].password === password) {
  //     this.props.setUserLoggedIn(true, username);
      
  //     return username;
  //   }
  // }

  render() {

    return (
      <div className='login'>
        <div className='login-div'>
          <h2>Login</h2>
          <LoginComponent {...this.state} />
        </div>
      </div>
    )
  }
}

export default LoginPage;