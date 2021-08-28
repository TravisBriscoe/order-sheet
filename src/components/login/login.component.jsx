import React from 'react';

import { signIn } from '../../firebase/firebase.utils';

import './login.styles.scss';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props) 

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.state = {
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

  async checkLogin(event) {
    event.preventDefault();

    const { username, password } = this.state;

    const signInData = await signIn(username, password);
    
    console.log('Login!?')
    console.log(signInData)
    if (signInData.name) {
      this.props.setUserLoggedIn(signInData.name);
    } else {
      this.props.setUserLoggedIn(null);
      alert('Invalid username or password.');
    }
    return signInData
  }


  render() {
    const { username, password } = this.state;

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