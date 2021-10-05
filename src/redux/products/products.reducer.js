import { FETCH_PRODUCTS } from './products.types';

const productsReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_PRODUCTS: 
      return {
        products: action.payload
      }
    default:
      return state;
  } 
}

export default productsReducer;
