import { FETCH_ORDER } from './order-list.types';

export const orderReducer = (state = '', action) => {
  switch (action.type) {
    case FETCH_ORDER:
      return {
        ...state,
        onOrder: action.payload
      }

    default:
      return state;
  }
}

export default orderReducer;