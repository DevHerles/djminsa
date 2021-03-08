import axios from 'axios';
import {
  FuseUtils
} from '@fuse';
import {
  showMessage
} from 'app/store/actions/fuse';
import apiService from 'app/services/api.service';
export const GET_PROFILE = 'GET_PROFILE';
export const SAVE_PROFILE = 'SAVE_PROFILE';

export function getById(id) {
  console.log("getById", id);
  const request = apiService.getById('partners', id);
  console.log(request);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    );
}

export function update(data) {
  const request = axios.post('/api/e-commerce-app/product/save', data);

  return (dispatch) =>
    request.then((response) => {

      dispatch(showMessage({
        message: 'Product Saved'
      }));

      return dispatch({
        type: SAVE_PROFILE,
        payload: response.data
      })
    });
}

export function newProfile() {
  const data = {
    id: FuseUtils.generateGUID(),
    name: '',
    handle: '',
    description: '',
    categories: [],
    tags: [],
    images: [],
    priceTaxExcl: 0,
    priceTaxIncl: 0,
    taxRate: 0,
    comparedPrice: 0,
    quantity: 0,
    sku: '',
    width: '',
    height: '',
    depth: '',
    weight: '',
    extraShippingFee: 0,
    active: true
  };

  return {
    type: GET_PROFILE,
    payload: data
  }
}