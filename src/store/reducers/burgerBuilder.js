import * as actionTypes from '../actions/actionTypes';

const intialState = {
    ingredients: null,
    totalPrice: 4,
    error: false 
};

const INCRIDENT_PRICES ={
    salad: 0.5,
    cheese: 0.6,
    meat: 0.7,
    bacon: 0.8
}

const reducer =(state=intialState, action) => {

switch(action.type){
case actionTypes.ADD_INGREDIENT:
return {
        ...state,
        ingredients:{
        ...state.ingredients,
        [action.ingredientName] : state.ingredients[action.ingredientName]+1
        },
        totalPrice: state.totalPrice + INCRIDENT_PRICES[action.ingredientName]
    }
case actionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName]-1
                },
            totalPrice: state.totalPrice - INCRIDENT_PRICES[action.ingredientName]
        }
case actionTypes.SET_INGREDIENTS:
    return {
        ...state,
        ingredients: action.ingredients,
        error: false
    }
case actionTypes.FAILED_INGREDIENTS:
    return{
        ...state,
        error: true
    }
 
default:
    return state 
}



};

export default reducer;