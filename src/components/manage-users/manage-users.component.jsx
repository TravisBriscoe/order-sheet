import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';

import '../../firebase/firebase.utils.js'

const ManageUsers = (props) => {
    const { users, userLoggedIn } = props;
    const userObj = Object.entries(users);
    
    let userNames
    userObj.forEach(user => {
      return userNames = {[user[0]]: false, ...userNames }
    });

    const [onAllow, setOnAllow] = useState(userNames);

    const adminDeleteAll = () => {
      if (userLoggedIn !== 'Admin') {
        return;
      } else {
        const deleteAllUsers = Object.entries(users).filter((user, index) => user[1].name !== 'Admin');
        console.log(deleteAllUsers.length)
        const userObjRemoved = userObj.filter((el, index) => el[index] === deleteAllUsers[index][1].name);
        console.log(userObjRemoved)
      }
    }

    return(
      <div>
        <h3>Manage Users</h3>
        {
          userObj.map((el) => {
            return (
              <div key={el[1].name}>
                <input type='text' disabled={onAllow[el[1].name] ? '' : 'disabled'} placeholder={`${el[1].name}`} />
                <input type='password' hidden={onAllow[el[1].name] ? '' : 'disabled'} placeholder={`${el[1].password}`} />
                <select hidden={onAllow[el[1].name] ? '' : 'disabled'} defaultValue={el[1].role}>
                  <option value='admin'>Admin</option>
                  <option value='manager'>Manager</option>
                  <option value='worker'>Worker</option>
                </select>
                <button onClick={() => setOnAllow({[el[1].name]: true})}>Edit</button>
                <button hidden={onAllow[el[1].name] ? '' : 'disabled'}>Save</button>
                <button hidden={onAllow[el[1].name] ? '' : 'disabled'}>Delete</button>
              </div>
            );
          })
        }
        <button>Add New User</button>
        {
          userLoggedIn === 'Admin' ?
            (<button onClick={adminDeleteAll}>Delete All!</button>)
            : null
        }
      </div>
    );
  }

export default withRouter(ManageUsers);