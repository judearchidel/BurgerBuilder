import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', ()=>{
    it('should return an intial state', ()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
        });
    }) ;
    it('should return a token on login',()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'  
        },{
            type: actionTypes.AUTH_SUCCESS,
            idtoken: 'some-token',
            userId: 'someid'
    })).toEqual({
        token: 'some-token',
        userId: 'someid',
        error: null,
        loading: false,
        authRedirect: '/'
    });
});
});
