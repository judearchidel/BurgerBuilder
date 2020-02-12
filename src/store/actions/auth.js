import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
 export const authSuccess = (token,userId) => {
     return {
         type: actionTypes.AUTH_SUCCESS,
         idtoken: token,
         userId: userId
     }
 }

 export const authFail = (error) => {
     return {
         type: actionTypes.AUTH_FAIL,
         error: error
     }
 }
 export const LogOut = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userid')
     return {
         type: actionTypes.AUTH_INIT_LOGOUT
     }
 }

 export const LogOutSuccess = () =>{
     return {
        type: actionTypes.AUTH_SINGOUT
     }
 }

 export const authlogOut = (time) =>{
    return {
        type: actionTypes.AUTH_TIMEOUT,
        time: time
    }
 }

 export const auth = (email, password, method) => {
     return {
         type: actionTypes.AUTH_USER,
         email: email,
         password: password,
         method: method
     }
 }

 export const setAutheRedirectPath = (pa) => {
     return {
         type: actionTypes.SET_AUTH_REDIRECT,
         path: pa
     }
 }


 export const authCheck = () => {
    return{
        type: actionTypes.AUTH_CHECK
    }  
 }