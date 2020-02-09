import * as actionTypes from '../actions/actionTypes';

const intialState ={
    orders: [],
    loading: false,
    purchased: false,
    orderLoad: false,
};

const reducer =(state = intialState,action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_FAILED:
            return {
                ...state,
                loading: false
            }
         case actionTypes.PURCHASE_LOAD:
          return {
            ...state,
            loading: true
          }   
        case actionTypes.PURCHASE_INIT:
        return{
            ...state,
            purchased: false
        }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                orderLoad: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                orderLoad: true
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                orderLoad: false
            }
        default:
            return state;
        
    }
}

export default reducer;