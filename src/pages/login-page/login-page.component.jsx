import React from 'react';

import LoginComponent from '../../components/login/login.component';
import NewUserComponent from '../../components/new-user/new-user.component';

import USER_DATA from '../../data/user.data';

import './login-page.styles.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.state = {
      users: USER_DATA,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    }
  }

  handleChange(event) {
    const { value, name } = event.target;
    
    this.setState({
      [name]: value
    });
  };

  checkLogin(event) {
    event.preventDefault();

    const { users, username, password } = this.state;

    console.log(users[username])

    if (!users[username]) {
      alert('Username or password does not match! Please try again');
      return this.setState({ username: '', password: '' });
    }      
    if (users[username].name === username && users[username].password === password) {
      this.props.setUserLoggedIn(true, username);
      
      return username;
    }
  }

  checkNewUser(event) {
    event.preventDefault();

    const { email, username, password, confirmPassword } = this.state;

    const { users: { email: usersEmail } } = this.state;

    console.log(users[username])
    console.log(usersEmail);

    if (password !== confirmPassword) {
      return alert('Passwords do not match!')
    }

    users.map(el => {
      el.email === email ? alert('Email already used! Use another email')
    })
    if (users[username].email === email) {
      return alert('Email already used! Use another email.');
    }      
    if (users[username].name === username && users[username].password === password) {
      this.props.setUserLoggedIn(true, username);
      
      return username;
    }
  }

  render() {

    return (
      <div className='login'>
        <div className='login-div'>
          <h2>Login</h2>
          <LoginComponent handleChange={this.handleChange} checkLogin={this.checkLogin} {...this.state} />
        </div>
        <div className='login-newuser'>  
          <h2>New User</h2>
          <NewUserComponent handleChange={this.handleChange} checkNewUser={this.checkNewUser} {...this.state} />
        </div>
      </div>
    )
  }
}

export default LoginPage;