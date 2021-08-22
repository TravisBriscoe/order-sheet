import React from 'react';

// import { Link } from 'react-router-dom';

// import NewUserComponent from '../newuser/newuser.component';

// import USER_DATA from '../../data/user.data';

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
    
    if (!signInData.isUserLoggedIn) {
      this.props.setUserLoggedIn(false, null);
      this.setState({ username: '', password: '' });
      return alert('Invalid username or password.');
    } else {
      this.props.setUserLoggedIn(signInData.isUserLoggedIn, signInData.name);
    }


    return signInData;

    // const signInData = signIn(username, password);

    // console.log(signInData);

    // console.log(users)

    // if (!users[username]) {
    //   alert('Username or password does not match! Please try again');
    //   return this.setState({ username: '', password: '' });
    // }      
    // if (users[username].name === username && users[username].password === password) {
    //   this.props.setUserLoggedIn(true, username);
      
    //   return username;
    // }
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