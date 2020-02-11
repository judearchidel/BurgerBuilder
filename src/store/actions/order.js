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
    return dispatch => {
       dispatch (purchaseload());
       
        axios.post('/orders.json?auth='+ token,orderData)
        .then(response=>{
            dispatch(purchaseSuccess(response.data.name,orderData))
        })
        .catch(error=> {
           dispatch(purchaseFailed(error));
            })
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
    const fetchData = []; 
    return dispatch => {
        dispatch(orderload());
        const queryParams = '/orders.json?auth='+ token + '&orderBy="userId"&equalTo="'+ userId + '"';
        axios.get(queryParams)
        .then(response=>{
        for(let i in response.data){
            fetchData.push({...response.data[i],i})
        }
        dispatch(orderSuccess(fetchData));
    })
    .catch(res=>{
       dispatch(orderFail(res));
    })
    }
}