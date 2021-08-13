import React from 'react';

// import { Link } from 'react-router-dom';

import USER_DATA from '../../data/user.data';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props) 

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.state = {
      users: USER_DATA,
      username: '',
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
    const { username, password } = this.state.users;

    return (
    <div className='login'>
        <form onSubmit={this.checkLogin} className='login-form'>
          <input
            type='text'
            name='username'
            value={username}
            onChange={this.handleChange}
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
          />
          <input type='submit' value='Login ' />
          {/* <Link to='/new-user' component={NewUserComponent} /> */}
        </form>
      </div>
    );
  }
};

export default LoginComponent;