import axios from '../../axios-order';
import * as actions from '../actions/index';
import {put} from 'redux-saga/effects';

 export function* getIngredientsSaga (action) {
   try{
    const response = yield axios.get('https://burgerbilder-4290c.firebaseio.com/incridents.json')
     yield put(actions.setIngredients(response.data))
   }catch{
      yield put(actions.failedIngredients())
    }
}