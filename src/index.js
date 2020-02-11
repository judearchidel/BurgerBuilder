import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilder from './store/reducers/burgerBuilder';
import OrderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';


const composeEnhancers = process.env.NODE_ENV === 'development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers ({
    bb: burgerBuilder,
    ob: OrderReducer,
    au: authReducer
})
const store =createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));



ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
