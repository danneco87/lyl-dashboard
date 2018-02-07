import axios from 'axios';
import _ from 'lodash';
//Creating cost to avoid typos
export const FETCH_PRODUCTS = 'fetch_products';
export const CREATE_PRODUCT = 'create_product';
export const FETCH_PRODUCT = 'fetch_product';
export const DELETE_PRODUCT = 'delete_product';
export const UPDATE_PRODUCT = 'update_product';

const ROOT_URL = 'http://127.0.0.1:8000/products/';
const AUTH_ROOT = 'http://127.0.0.1:8000/api-token/';
const USER = 'danne';
const PASS = 'adminLYL';
const AUTH = 'Authorization: JWT ';
const DATA = JSON.stringify({
  password: PASS,
  username: USER
});

export function getToken() {
  return axios.post(AUTH_ROOT, DATA, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function fetchProducts() {
  const request = axios.get(ROOT_URL, {
    responseType: 'json'
  });
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function createProduct(values, token, callback) {
  const request = axios
    .post(`${ROOT_URL}`, values, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(() => callback());

  return {
    type: CREATE_PRODUCT,
    payload: request
  };
}

export function fetchProduct(id) {
  const request = axios.get(`${ROOT_URL}${id}`, {
    AUTH
  });

  return {
    type: FETCH_PRODUCT,
    payload: request
  };
}

export function deleteProduct(id, token, callback) {
  const request = axios
    .delete(`${ROOT_URL}${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
        data: { product_id: id }
      }
    })
    .then(() => callback());
  return {
    type: DELETE_PRODUCT,
    payload: id
  };
}

export function updateProduct(id, token, name, description, price, callback) {
  const request = axios
    .put(
      `${ROOT_URL}${id}/`,
      { name, description, price },
      {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
    )
    .then(() => callback());
  return {
    type: UPDATE_PRODUCT,
    payload: id
  };
}
