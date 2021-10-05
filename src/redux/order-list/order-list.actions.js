import { FETCH_ORDER } from './order-list.types';

import { orderListData } from '../../firebase/firebase.utils';

export const fetchOrder = () => async dispatch => {
  const onOrderData = await orderListData();

  return dispatch ({
    type: FETCH_ORDER,
    payload: onOrderData,
  })
};

export const addToOrder = () => async dispatch => {

}

export default fetchOrder;