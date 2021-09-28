// Login Page
// Class Component

import React from 'react';

import LoginComponent from '../../components/login/login.component';

import './login-page.styles.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: this.props.users,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    }
  }

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