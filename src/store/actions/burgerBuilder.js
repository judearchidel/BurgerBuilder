import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngeridents = (ingName)=>{
   return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
}
}
export const removeIngredient = (ingName) => {
   return{
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
}
}

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const failedIngredients = () => {
    return{
        type: actionTypes.FAILED_INGREDIENTS
    }
}

export const getIngredients = () => {
    return dispatch => {
        axios.get('https://burgerbilder-4290c.firebaseio.com/incridents.json')
        .then(response=>{
            dispatch(setIngredients(response.data))
        })
        .catch(error =>{
            dispatch(failedIngredients())
        })
    }
}