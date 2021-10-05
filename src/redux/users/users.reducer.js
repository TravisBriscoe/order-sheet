import { DELETE_USER, EDIT_USER, FETCH_USERS, NEW_USER } from './users.types';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        users: action.payload
      }
    case NEW_USER:
      return {
        users: action.payload
      }
    case DELETE_USER:
      return {
        users: action.payload
      }
    case EDIT_USER:
      return {
        users: action.payload
      }
    
    default:
      return state;
  }
}

export default usersReducer;