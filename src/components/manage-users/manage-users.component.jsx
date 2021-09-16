import React from 'react';

import '../../firebase/firebase.utils.js';

import NewUser from '../add-user/add-user.component.jsx';

import './manager-users.styles.scss';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props)

    this.onAddEdits = this.onAddEdits.bind(this);
    this.onCloseNewUser = this.onCloseNewUser.bind(this);

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

  onCloseNewUser() {
    this.setState({ onNewUser: false });
  }

  render() {

    const { onAddEdits, state: { onAllow }, props: { users }} = this;
    const userObj = Object.entries(users);

    return(
      <div className='manage-users-container'>
        { users ? 
          <div className='manage-users'>
            <div className='manage-users-hd'>
              {
                !this.state.onNewUser ?
                  (<button className='manage-users-hd--adduser_btn' onClick={() => {this.setState({ onNewUser: true })}}>Add New User</button>)
                : (
                  <div>
                    <NewUser userLength={Object.keys(users).length} onNewEntry={this.props.onNewEntry} users={users} onNewUser={this.state.onNewUser} onClose={this.onCloseNewUser} />
                  </div>
                  )
              }
            </div>
            <div className='manage-users-content'>
              {
                userObj.map((el) => {
                  const user = el[1];
                  return (
                    <div key={user.name}>
                      {
                        !onAllow[user.name] ?
                          <div className='manage-users-content-list'>
                            <p className='manage-users-content-list--name'>{user.name}</p>
                            <button className='manage-users-content-list--edit_btn' onClick={() => this.setState({ onAllow: { [user.name]: true }})}>Edit</button>
                          </div>
                        :
                          <div className='manage-users-content-list-form'>
                            <input
                              className='manage-users-content-list-form--name'
                              type='text'
                              disabled={onAllow[user.name] ? '' : 'disabled'}
                              placeholder={`${user.name}`}
                              name='name'
                              user={user.name}
                              defaultValue={user.name}
                              onChange={(event) => onAddEdits(user, event)}
                            />
                            <input
                              className='manage-users-content-list-form--password'
                              type='password'
                              placeholder={`${user.password}`}
                              name='password'
                              defaultValue=''
                              onChange={(e) => onAddEdits(user, e)}
                            />
                            <input
                              className='manage-users-content-list-form--email'
                              type='email'
                              placeholder={user.email}
                              name='email'
                              defaultValue=''
                              onChange={(e) => onAddEdits(user, e)}
                            />
                            <select
                              className='manage-users-content-list-form--role'
                              name='role'
                              defaultValue={user.role}
                              onChange={(e) => onAddEdits(user, e)}
                              disabled={user.id === '0001' && user.role === 'manager' ? 'disabled' : ''}
                            >
                              <option value='manager'>Manager</option>
                              <option value='worker'>Worker</option>
                              <option value='tester'>Tester</option>
                            </select>
                            <div className='manage-users-content-list-form--btn'>
                              <button className='manage-users-content-list-form--btn_save' onClick={() => this.props.onUpdateEntry('users', this.state.onEdit)}>Save</button>
                              <button className='manage-users-content-list-form--btn_delete' disabled={user.id === '0001' && user.role === 'manager' ? 'disabled' : ''} onClick={() => this.props.onDeleteEntry('users', user)}>Delete</button>
                              <button 
                                className='manage-users-content-list-form--btn_cancel'
                                onClick={() => {
                                  this.setState({ onEdit: ''}, () => this.setState({ onAllow: { [user.name]: false }}))
                                }}>Cancel</button>
                              </div>
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