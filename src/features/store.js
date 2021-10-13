import { configureStore } from '@reduxjs/toolkit';

// Reducers
import productReducer from './products';
import ordersReducer from './orders';
import usersReducer from './users';
import recipeReducer from './recipes';

// Store
const store = configureStore({
  reducer: {
    productsData: productReducer,
    usersData: usersReducer,
    ordersData: ordersReducer,
    recipesData: recipeReducer,
  },
})

export default store;