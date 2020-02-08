import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseSuccess =(id,orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseFailed = (error)=>{
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: error
    }
}

export const purchaseStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json',orderData)
        .then(response=>{
            console.log(response.data);
            dispatch(purchaseSuccess(response.data,orderData))
        })
        .catch(error=> {
           dispatch(purchaseFailed(error));
            })
    }
}