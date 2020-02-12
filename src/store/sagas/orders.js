import { put } from 'redux-saga/effects'
import * as actions from '../actions/index';
import axios from '../../axios-order';

export function* orderStartSaga (action) {
    const fetchData = []; 
        yield put(actions.orderload());
        const queryParams = '/orders.json?auth='+ action.token + '&orderBy="userId"&equalTo="'+ action.userId + '"';
        try {
        const response = yield axios.get(queryParams)
        for(let i in response.data){
           yield fetchData.push({...response.data[i],i})
        }
        yield put(actions.orderSuccess(fetchData));
    }catch(error){
       yield put(actions.orderFail(error));
    }
};
export function*  purchaseStartSaga (action){
       yield put(actions.purchaseload());
        try {
         const response = yield axios.post('/orders.json?auth='+ action.token,action.orderData)
         yield put(action.purchaseSuccess(response.data.name,action.orderData))
         }catch(error){
         yield put(actions.purchaseFailed(error));
             }
     }