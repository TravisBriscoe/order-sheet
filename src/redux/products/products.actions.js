import { FETCH_PRODUCTS } from './products.types';

import { productData } from '../../firebase/firebase.utils';

export const fetchProducts = () => async dispatch => {
    const productDataObj = await productData()
    
    const productDataArr = Object.entries(productDataObj).map(x => x[1])
    productDataArr.sort((a, b) => a.name.localeCompare(b.name));
  
    return dispatch({
      type: FETCH_PRODUCTS,
      payload: productDataArr,
    })
  }

export default fetchProducts;