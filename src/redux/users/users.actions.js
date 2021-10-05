// REDUX state actions for users.
// Allows editing, adding, removing users and then updating the USERS state object to reflect the changes.

import { FETCH_USERS, EDIT_USER, NEW_USER, DELETE_USER } from './users.types';

import { userData, addNewEntry, deleteEntry, updateEntry } from '../../firebase/firebase.utils';

// Fetch all Users in the database
export const fetchUsers = () => async dispatch => {
  const userDataObj = await userData();

  return dispatch ({
    type: FETCH_USERS,
    payload: userDataObj,
  })
}

// Edit and update existing user in the database
export const editUser = (collectionRef, user) => async dispatch => {
  await updateEntry(collectionRef, user);
  const userDataObj = await userData();

  return dispatch ({
    type: EDIT_USER,
    payload: userDataObj,
  })
}

// Add a new user entry into the database
export const addUser = (newUserData) => async dispatch => {
  await addNewEntry('users', newUserData);
  const userDataObj = fetchUsers();

  return dispatch ({
    type: NEW_USER,
    payload: userDataObj,
  })
}

// Delete a user entry from the database
export const deleteUser = (user) => async dispatch => {
  await deleteEntry('users', user);
  const userDataObj = fetchUsers();

  return dispatch ({
    type: DELETE_USER,
    payload: userDataObj
  })
}

export default fetchUsers;