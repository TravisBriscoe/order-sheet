import React from 'react';

class NewUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newUser: {
        name: '',
        email: '',
        role: '',
        password: '',
        id: this.props.userLength < 10 ? `000${this.props.userLength + 1}` : `00${this.props.userLength + 1}`,
      }
    }
  }

  onHandleInput(event) {
    const { name, value } = event.target;

    this.setState((prevState) => 
    ({ newUser: {
        ...prevState.newUser,
        [name]: value
      }})
    )
  }

  onHandleSubmit(event, data) {
    event.preventDefault();

  }

  render() {
    
    return (
      <div>
        <h3>New User!</h3>
        <form>
          <input name='name' placeholder='Username' />
          <input name='password' placeholder='Password' />
          <input name='confirmPassword' placeholder='Confirm Password' />
          <input name='email' placeholder='Email' />
          <input name='id' disabled placeholder={this.state.newUser.id} />
          <select>
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