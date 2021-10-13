import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux/Toolkit imports
import { Provider } from 'react-redux';
import store from './features/store';
import { fetchProductData } from './features/products';
import { fetchOrdersData } from './features/orders';
import { fetchUserData } from './features/users';
import { fetchRecipesData } from './features/recipes';

import './index.scss';
import App from './App';

// Fetch async data with Redux
store.dispatch(fetchProductData());
store.dispatch(fetchOrdersData());
store.dispatch(fetchUserData());
store.dispatch(fetchRecipesData());

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