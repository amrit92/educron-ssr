import {combineReducers} from 'redux';
import auth from './auth';
import posts from './posts';
import results from './results';
import {reducer as formReducer} from 'redux-form';
import {reducer as awaitReducer} from 'redux-await';
import await from './await';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    auth,
    posts,
    results,
    form: formReducer,
    routing: routerReducer,
    await
})