import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userData, addNewEntry, deleteEntry, updateEntry, deleteCollection } from '../firebase/firebase.utils';

const getUsers = async () => {
  const userDataObj = await userData();

  const userDataArr = Object.entries(userDataObj).map(x => x[1]);

  return userDataArr;
};


const fetchUserData = createAsyncThunk('usersData/users', 
  async () => {

    return getUsers();
});

const addNewUser = createAsyncThunk('usersData/newUser',
  async (data) => {
    console.log(data)
    await addNewEntry('users', {id: data.id, ...data});

    return getUsers();
  }
)

const deleteUser = createAsyncThunk('usersData/deleteUser',
  async (data) => {
    await deleteEntry('users', { id: data.id });

    return getUsers();
  }
)

const editUser = createAsyncThunk('usersData/editUser',
  async (data) => {
    await updateEntry('users', data);

    return getUsers();
  }
)

const deleteAllUsers = createAsyncThunk('usersData/deleteAllUsers',
  async () => {
    await deleteCollection('users');

    return getUsers();
  }
)

const usersSlice = createSlice({
  name: 'usersData',
  initialState: {
    users: [],
  },

  extraReducers: (builder) => {

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.users = action.payload;
    })

    builder.addCase(addNewUser.fulfilled, (state, action) => {
      return state;
    })

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      return state;
    })

    builder.addCase(editUser.fulfilled, (state, action) => {
      return state;
    })

    builder.addCase(deleteAllUsers.fulfilled, (state, action) =>{
      return state;
    })
  }
});

export { fetchUserData, addNewUser, deleteUser, editUser, deleteAllUsers };

export default usersSlice.reducer;