import { applyMiddleware, createStore, compose } from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const initialState = {
  users: '',
  recipes: '',
  onOrder: '',
  loggedInUser: '',
  onQuantity: 0,
  sortedProds: '',
  distributor: 'all',
  storedWhere: 'all',
  storedWhat: 'all',
  sortCategory: 'all',
  isLoading: false,
  notification: false,
  onNewRecipe: false,
}

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;