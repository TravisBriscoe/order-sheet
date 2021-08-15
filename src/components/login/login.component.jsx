import React from 'react';

// import { Link } from 'react-router-dom';

// import NewUserComponent from '../newuser/newuser.component';

import USER_DATA from '../../data/user.data';

import './login.styles.scss';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props) 

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.state = {
      users: USER_DATA,
      username: '',
      location: '',
      password: '',
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


  render() {
    const { username, location, password } = this.state.users;

    return (
      <div className='login'>
        <h2>Login</h2>
        <form onSubmit={this.checkLogin} className='login-form'>
          <input
            className='login-form--username'
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={this.handleChange}
          />
          <input
            className='login-form--location'
            type='text'
            name='location'
            placeholder='Location'
            value={location}
            onChange={this.handleChange}
          />
          <input
            className='login-form--password'
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={this.handleChange}
          />
          {/* <Link component={NewUserComponent}><button className='login-form--newuser-btn'>New User</button></Link> */}
          <input className='login-form--login-btn' type='submit' value='Login' />
          {/* <Link to='/new-user' component={NewUserComponent} /> */}
        </form>
      </div>
    );
  }
};

export default LoginComponent;