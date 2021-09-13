import React from 'react';

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
      this.props.onNewEntry('users', this.state.newUser);

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
      <div>
        <form onSubmit={(event) => this.onNewUserSubmit(event)}>
          <input name='name' placeholder='Username' onChange={this.onHandleInput} value={this.state.newUser.name} required />
          <input type='password' name='password' placeholder='Password' onChange={this.onHandleInput} value={this.state.newUser.password} required />
          <div> 
            <input type='password' name='confirmPassword' placeholder='Confirm Password' value={this.state.confirmPassword} onChange={this.onHandleInput} required />
            {
              this.state.newUser.password !== this.state.confirmPassword ?
                (<div>Passwords don't match!</div>)
              :
                null
            }
          </div>
          <div>
            <input type='email' name='email' placeholder='Email' onChange={this.onHandleInput} value={this.state.newUser.email} required />
            {
              Object.entries(this.props.users).map((user) => {
                const { email } = user[1];
                let emailConfirm;
                email === this.state.newUser.email ?
                  emailConfirm = (<div key={email}>Email already in user. Please use another email.</div>)
                : emailConfirm = null;
                
                return emailConfirm
              })
            }
          </div>
          <select name='role' onChange={this.onHandleInput} defaultValue='worker'>
            <option value='manager'>Manager</option>
            <option value='worker'>Worker</option>
            <option value='tester'>Tester</option>
          </select>
          <input type='submit' value='add user' />
        </form>
      </div>
    )
  };
}

export default NewUser;