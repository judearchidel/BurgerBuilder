import { takeEvery} from 'redux-saga/effects';
import {logoutSaga ,authlogOutSaga, authSaga, authcheckSaga} from './auth';
import * as actiontypes from '../actions/actionTypes';
import {getIngredientsSaga} from './burgerBuilder';
import {orderStartSaga, purchaseStartSaga} from './orders';

export function* watchauth(){
    yield takeEvery(actiontypes.AUTH_INIT_LOGOUT,logoutSaga);
    yield takeEvery(actiontypes.AUTH_TIMEOUT,authlogOutSaga);
    yield takeEvery(actiontypes.AUTH_USER, authSaga);
    yield takeEvery(actiontypes.AUTH_CHECK,authcheckSaga);
}

export function* watchburgerBuilder(){
yield takeEvery(actiontypes.GET_INGREDIENTS,getIngredientsSaga);
}
export function* watchOrders(){
    yield takeEvery(actiontypes.ORDER_INIT, orderStartSaga);
    yield takeEvery(actiontypes.PURCHASE_START,purchaseStartSaga);
}