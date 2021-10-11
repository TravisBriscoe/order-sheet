import React from 'react';
import { connect } from 'react-redux';
import { addNewUser } from '../../features/users';

import './add-user.styles.scss';

class NewUser extends React.Component {
  constructor(props) {
    super(props)

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onNewUserSubmit = this.onNewUserSubmit.bind(this);

    this.state = {
      newUser: {
        name: '',
        email: '',
        role: 'worker',
        password: '',
        id: this.props.userLength < 10 ? `000${this.props.userLength + 1}` : `00${this.props.userLength + 1}`,
      },
      confirmPassword: '',
    }
  }

  onHandleInput(event) {
    const { name, value } = event.target;

    if (name === 'confirmPassword') {
      this.setState({ confirmPassword: value})
    } else {
      this.setState((prevState) => 
      ({ newUser: {
          ...prevState.newUser,
          [name]: value
        }})
      )
    }
  }

  onPasswordConfirm() {
    if (this.state.newUser.password !== this.state.confirmPassword) {
      alert(`Password's don't match!`);
      return false;
    } else return true;
  }

  onNewUserSubmit(event) {
    event.preventDefault();
    const passwordCheck = this.onPasswordConfirm();
    if (passwordCheck) {
      this.props.onAddNewUser(this.state.newUser);

      this.setState({ newUser: {
        name: '',
        password: '',
        email: '',
        role: 'worker',
      }}, () => this.setState({ confirmPassword: '' }))
    }
  }

  render() {
    
    return (
      <div className='add-user'>
        <form className='add-user-form' onSubmit={(event) => this.onNewUserSubmit(event)}>
          <input className='add-user-form-name' name='name' placeholder='Username' onChange={this.onHandleInput} value={this.state.newUser.name} required />
          <input className='add-user-form-password' type='password' name='password' placeholder='Password' onChange={this.onHandleInput} value={this.state.newUser.password} required />
          <input className='add-user-form-confirmpass' type='password' name='confirmPassword' placeholder='Confirm Password' value={this.state.confirmPassword} onChange={this.onHandleInput} required />
          <input className='add-user-form-email' type='email' name='email' placeholder='Email' onChange={this.onHandleInput} value={this.state.newUser.email} required />
          <select className='add-user-form-role' name='role' onChange={this.onHandleInput} defaultValue='worker'>
            <option value='manager'>Manager</option>
            <option value='worker'>Worker</option>
            <option value='tester'>Tester</option>
          </select>
          <div class='add-user-form-btns'>
            <input className='add-user-form-btns--submit' type='submit' value='Add User' />
            <button className='add-user-form-btns--cancel' onClick={() => this.props.onClose()}>Cancel</button>
          </div>
        </form>
        <div className='add-user-errors'>
          <div className='add-user-errors-password'>
              {
                this.state.newUser.password !== this.state.confirmPassword ?
                  (<p className='add-user-errors-password--error'>Passwords don't match!</p>)
                :
                  null
              }
            </div>
            <div className='add-user-errors-email'>
              {
                Object.entries(this.props.users).map((user) => {
                  const { email } = user[1];
                  let emailConfirm;
                  email === this.state.newUser.email ?
                    emailConfirm = (<p className='add-user-errors-email--error' key={email}>Email already in use!<br />Please use another email.</p>)
                  : emailConfirm = null;
                  
                  return emailConfirm
                })
              }
            </div>
          </div>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  onAddNewUser: (data) => dispatch(addNewUser(data))
})

export default connect(null, mapDispatchToProps)(NewUser);