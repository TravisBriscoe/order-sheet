import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// React/Toolkit imports
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer, { fetchOnOrder, fetchProductData } from './features/products';
import usersReducer, { fetchUserData } from './features/users'

import './index.scss';
import App from './App';

// Store configuration
const store = configureStore({
  reducer: {
    productsData: productReducer,
    usersData: usersReducer,
  },
})

store.dispatch(fetchProductData());
store.dispatch(fetchOnOrder());
store.dispatch(fetchUserData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);