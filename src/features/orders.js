import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { orderListData, addNewEntry, deleteEntry, updateEntry, deleteCollection } from '../firebase/firebase.utils';

const getOrders = async () => {
  const onOrderDataObj = await orderListData();

  const onOrderDataArr = Object.entries(onOrderDataObj).map(x => x[1]);

  return onOrderDataArr;
}

const fetchOrdersData = createAsyncThunk('orders/onOrder',
  async() => {
    
    return getOrders();
  }
);

const addItem = createAsyncThunk('orders/addItem', 
  async (data) => {
    await addNewEntry('order-list', data);

    return getOrders();
  }
)

const updateItem = createAsyncThunk('orders/updateItem',
  async (data) => {
    await updateEntry('order-list', data);

    return getOrders();
  }
)

const deleteItem = createAsyncThunk('orders/removeItem',
  async (data) => {
    await deleteEntry('order-list', data);

    return getOrders();
  }
)

const deleteAllItems = createAsyncThunk('orders/removeAllItems', 
  async () => {
    await deleteCollection('order-list');

    return getOrders();
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    onOrder: {},
  },
  
  extraReducers: (builder) => {

    builder.addCase(fetchOrdersData.fulfilled, (state, action) => {
      state.onOrder = action.payload;
    })
    builder.addCase(addItem.fulfilled, (state, action) => {
      return state;
    })
    builder.addCase(updateItem.fulfilled, (state, action) => {
      return state;
    })
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      return state;
    })
    builder.addCase(deleteAllItems.fulfilled, (state, action) => {
      return state;
    })
  }
})

export { fetchOrdersData, addItem, updateItem, deleteItem, deleteAllItems }

export default ordersSlice.reducer;