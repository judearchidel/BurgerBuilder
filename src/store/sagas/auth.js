import { put , call} from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"],'token');
    yield call([localStorage, "removeItem"],'expirationDate');
    yield call([localStorage, "removeItem"],'userid');
    yield put(actions.LogOutSuccess());
}

export function* authlogOutSaga(action){
   yield delay (action.time*1000);
   yield put(actions.LogOut());
}

export function* authSaga (action){
    yield put (actions.authStart());
    const authData = {
                email: action.email,
                password: action.password,
                returnSecureToken: true
   };
let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBT_WgSizsNxo6cYfrjaOnXAm5GlwNRVpU'
if(!action.method){
url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBT_WgSizsNxo6cYfrjaOnXAm5GlwNRVpU'   
}
try {
const response = yield axios.post(url,authData)
    const expirationtime = yield new Date(new Date().getTime()+(response.data.expiresIn *1000))
    localStorage.setItem('token',response.data.idToken);
    localStorage.setItem('expirationDate',expirationtime);
    localStorage.setItem('userid',response.data.localId);
    yield put(actions.authSuccess(response.data.idToken,response.data.localId));
    yield put(actions.authlogOut(response.data.expiresIn))
}catch(error){
    yield put(actions.authFail(error.response.data.error.message))
}

   }

export function* authcheckSaga (action){

        const token = yield localStorage.getItem('token');
        if(!token){
          yield put(actions.LogOut());
        }else{
           const expiresTime = yield new Date(localStorage.getItem('expirationDate'));
            if(expiresTime <= new Date())
            {
                yield put(actions.LogOut());
            }else{
                const user =localStorage.getItem('userid')
                yield put(actions.authSuccess(token,user));
                yield put(actions.authlogOut((expiresTime.getTime()- new Date().getTime())/1000));
            }
        }

     }

