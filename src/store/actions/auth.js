import axios from 'axios';
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
     localStorage.removeItem('token');
     localStorage.removeItem('expirationDate');
     localStorage.removeItem('userid')
     return {
         type: actionTypes.AUTH_SINGOUT
     }
 }

 export const authlogOut = (time) =>{
    return dispatch => {
        setTimeout(()=>{
           dispatch(LogOut());
        },time*1000)
    }
 }

 export const auth = (email, password, method) => {
     return dispatch => {
         dispatch(authStart());
         const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBT_WgSizsNxo6cYfrjaOnXAm5GlwNRVpU'
    if(!method){
     url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBT_WgSizsNxo6cYfrjaOnXAm5GlwNRVpU'   
    }
     axios.post(url,authData)
     .then(response => {
         const expirationtime = new Date(new Date().getTime()+(response.data.expiresIn *1000))
         localStorage.setItem('token',response.data.idToken);
         localStorage.setItem('expirationDate',expirationtime);
         localStorage.setItem('userid',response.data.localId);
         dispatch(authSuccess(response.data.idToken,response.data.localId));
         dispatch(authlogOut(response.data.expiresIn))
     })
     .catch(err => {
        console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error.message)); 
     });
        }
 }

 export const setAutheRedirectPath = (pa) => {
     return {
         type: actionTypes.SET_AUTH_REDIRECT,
         path: pa
     }
 }


 export const authCheck = () => {
    
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(LogOut());
        }else{
           const expiresTime = new Date(localStorage.getItem('expirationDate'));
            if(expiresTime <= new Date())
            {
                dispatch(LogOut());
            }else{
                const user =localStorage.getItem('userid')
                dispatch(authSuccess(token,user));
                dispatch(authlogOut((expiresTime.getTime()- new Date().getTime())/1000));
            }
        }

     }
 }