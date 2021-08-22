import React from 'react';

import { withRouter } from 'react-router-dom';

import '../../firebase/firebase.utils.js'

const ManageUsers = (props) => {
    const { users, userLoggedIn } = props;
    const userObj = Object.entries(users);
    console.log(userLoggedIn)

    const adminDeleteAll = () => {
      if (userLoggedIn !== 'Admin') {
        return;
      } else {
        const deleteAllUsers = Object.entries(users).filter((user, index) => user[1].name !== 'Admin');
        console.log(deleteAllUsers.length)
        const userObjRemoved = userObj.filter((el, index) => el[index] === deleteAllUsers[index][1].name);
        // for (let i = 0; i === deleteAllUsers.length; i++) {
        //   console.log(deleteAllUsers[i])
        //   return delete userObj[i][deleteAllUsers[1]].name
        // }
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
        {
          userLoggedIn === 'Admin' ?
            (<button onClick={adminDeleteAll}>Delete All!</button>)
            : null
        }
      </div>
    );
  }

export default withRouter(ManageUsers);