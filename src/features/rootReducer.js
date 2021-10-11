import { combineReducers } from 'redux';
import reducer from './product';

export const rootReducer = combineReducers({
  products: reducer
});

export default rootReducer;