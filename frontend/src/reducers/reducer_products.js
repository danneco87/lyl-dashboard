import React from 'react';
import _ from 'lodash';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from '../actions/index';

const ReducerProducts = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return _.omit(state, action.payload);
    case FETCH_PRODUCT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case UPDATE_PRODUCT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_PRODUCTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
};

export default ReducerProducts;
