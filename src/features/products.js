import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addNewEntry, productData, orderListData, deleteEntry, updateEntry } from '../firebase/firebase.utils';

const getProducts = async() => {
  const productDataObj = await productData();

  const productDataArr = Object.entries(productDataObj).map(x => x[1]);

  productDataArr.sort((a, b) => a.name.localeCompare(b.name));

  return productDataArr;
}

const fetchProductData = createAsyncThunk( 'productsData/products',
  () => {
    return getProducts();
  }
)

const fetchOnOrder = createAsyncThunk('productsData/onOrder',
  async() => {
    const onOrderDataObj = await orderListData();

    const onOrderDataArr = Object.entries(onOrderDataObj).map(x => x[1]);
    
    getProducts();

    return onOrderDataArr;
  }
)

const addNewProduct = createAsyncThunk('productsData/newProductData',
  async (data) => {
    console.log(data)
    await addNewEntry('products', {id: data.id, ...data});

    return getProducts();
  }
)

const deleteProduct = createAsyncThunk('productsData/deleteProduct',
  async (data) => {
    await deleteEntry('products', { id: data.id });

    return getProducts();
  }
)

const editProduct = createAsyncThunk('productsData/editProduct',
  async (data) => {
    await updateEntry('products', data);

    return getProducts();
  }
)

export const productSlice = createSlice({
  name: 'productsData',
  initialState: {
    products: [],
    sortedProds: [],
    onOrder: {},
  },
  
  // reducers: {
  //   addOnOrder(state, action) {
  //     console.log(action.payload)
  //     state.onOrder = {
  //       ...state.onOrder,
  //       ...action.payload
  //     }
  //   },
  // },
  
  extraReducers: (builder) => {

    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.products = action.payload;
      state.sortedProds = action.payload;
    })
    
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      return state;
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      return state;
    })

    builder.addCase(editProduct.fulfilled, (state, action) => {
      return state;
    })

    builder.addCase(fetchOnOrder.fulfilled, (state, action) => {
      state.onOrder = action.payload;
    }
  )
  },
});

export { fetchProductData, fetchOnOrder, addNewProduct, deleteProduct, editProduct };

export default productSlice.reducer;