import { combineReducers } from 'redux';
import { reducer as fromReducer } from 'redux-form';
import ReducerProducts from './reducer_products';

const rootReducer = combineReducers({
  products: ReducerProducts,
  form: fromReducer
});

export default rootReducer;
