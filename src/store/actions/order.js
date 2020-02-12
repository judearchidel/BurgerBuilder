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
export const purchaseload = () => {
    return{
        type: actionTypes.PURCHASE_LOAD
    }
}

export const purchaseStart = (orderData,token) => {
   return{
       type: actionTypes.PURCHASE_START,
       orderData: orderData,
       token: token
   }
}

export const purachseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const orderSuccess = (orders) => {
    return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
}
}
export const orderload =() =>{
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const orderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const orderStart = (token, userId) => {
    return{
        type: actionTypes.ORDER_INIT,
        token: token,
        userId: userId
    }
}