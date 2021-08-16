import React from 'react';

import { withRouter } from 'react-router-dom';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      users: this.props.users,
    }
  }
  
  render() {
    const { users } = this.state;
    const userObj = Object.entries(users);
    console.log(this.props)

    return(
      <div>
        <h3>Manage Users</h3>
        {
          userObj.map((el) => {
            return (
              <div key={el[1].name}>
                <input type='text' disabled placeholder={`${el[1].name}`} />
                <input type='password' disabled placeholder={`${el[1].password}`} />
                <select disabled>
                  <option value='admin'>Admin</option>
                  <option value='manager'>Manager</option>
                  <option value='worker'>Worker</option>
                </select>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            );
          })
        }
        <button>Add New User</button>
        {/* {
          userLoggedIn === 'Admin' ?
            (<button>Delete All!</button>)
            : null
        } */}
      </div>
    );
  }
}

export default withRouter(ManageUsers);