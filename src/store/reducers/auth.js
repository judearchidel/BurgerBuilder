import * as actionTypes from '../actions/actionTypes';

const intialState ={
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
};

const reducer =(state = intialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
        return {
            ...state,
            error: null,
            loading: true
        }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idtoken,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_SINGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case actionTypes.SET_AUTH_REDIRECT:
            return{
                ...state,
                authRedirect: action.path
            }
        
        default:
            return state
    }
}

export default reducer;