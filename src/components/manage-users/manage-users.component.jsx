import React from 'react';

import '../../firebase/firebase.utils.js';

import NewUser from '../add-user/add-user.component.jsx';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props)

    this.onAddEdits = this.onAddEdits.bind(this);

    this.state = {
      onAllow: {},
      onEdit: {
        data: {}
      },
      onNewUser: false,
    }
  }

  componentDidMount() {
    const { users } = this.props;
    const userObj = Object.entries(users);

    userObj.forEach(user => {
      let userNames
      userNames = {[user[0]]: false , ...userNames }

      return this.setState({ onAllow: userNames });
    });
  }

  onAddEdits(user, event) {
    const { value, name } = event.target;
    this.setState((prevState) => {
      let returnData;
      if (prevState.onEdit.data.name) {
        returnData = 
          {
            onEdit: {
              ...prevState.onEdit,
              data: {
                ...prevState.onEdit.data,
                id: user.id,
                [name]: value,
              }
            }
          }
      } else {
        returnData = 
          {
            onEdit: {
              ...prevState.onEdit,
              data: {
                ...prevState.onEdit.data,
                name: user.name,
                id: user.id,
                [name]: value,
              }
            }
          }
      }
      return { ...returnData }
    })
  }

  render() {

    const { onAddEdits, state: { onAllow }, props: { users }} = this;
    const userObj = Object.entries(users);

    return(
      <div>
        { users ? 
          <div>
            <div className='manage-users-hd'>
              <h3>Manage Users</h3>
              {
                !this.state.onNewUser ?
                  (<button onClick={() => {this.setState({ onNewUser: true })}}>Add New User</button>)
                : (
                  <div>
                    <NewUser />
                    <button onClick={() => this.setState({ onNewUser: false })}>Cancel</button>
                  </div>
                  )
              }
            </div>
            <div>
              {
                userObj.map((el) => {
                  const user = el[1];
                  return (
                    <div key={user.name}>
                      {
                        !onAllow[user.name] ?
                          <div>
                            {user.name}
                            <button onClick={() => this.setState({ onAllow: { [user.name]: true }})}>Edit</button>
                          </div>
                        :
                          <div>
                            <input
                              type='text'
                              disabled={onAllow[user.name] ? '' : 'disabled'}
                              placeholder={`${user.name}`}
                              name='name'
                              user={user.name}
                              defaultValue={user.name}
                              onChange={(event) => onAddEdits(user, event)}
                            />
                            <input
                              type='password'
                              placeholder={`${user.password}`}
                              name='password'
                              defaultValue=''
                              onChange={(e) => onAddEdits(user, e)}
                            />
                            <input
                              type='email'
                              placeholder={user.email}
                              name='email'
                              defaultValue=''
                              onChange={(e) => onAddEdits(user, e)}
                            />
                            <select
                              name='role'
                              defaultValue={user.role}
                              onChange={(e) => onAddEdits(user, e)}
                            >
                              <option value='admin'>Admin</option>
                              <option value='manager'>Manager</option>
                              <option value='worker'>Worker</option>
                            </select>
                            <button onClick={() => this.props.onUpdateEntry('users', this.state.onEdit)}>Save</button>
                            <button>Delete</button>
                            <button onClick={() => {
                              this.setState({ onEdit: ''}, () => this.setState({ onAllow: { [user.name]: false }}))
                            }}>Cancel</button>
                          </div>
                      }
                    </div>
                  );
                })
              }
            </div>
          </div>
        : null
        }
      </div>
    );
  }
}
export default ManageUsers;