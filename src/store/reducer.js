import * as actionTypes from './actions';

const intialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4
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
 
default:
    return state 
}



};

export default reducer;