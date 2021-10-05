import { combineReducers } from 'redux';

// Reducers
import productsReducer from './products/products.reducer';
import recipesReducer from './recipes/recipes.reducer'
import usersReducer from './users/users.reducer';
import orderReducer from './order-list/order-list.reducer'

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  recipes: recipesReducer,
  onOrder: orderReducer,
});

export default rootReducer;