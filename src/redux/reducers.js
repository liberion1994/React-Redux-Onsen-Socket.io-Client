/**
 * Created by liboyuan on 2016/10/12.
 */

import { combineReducers } from 'redux'
import * as Actions from './actions';
import * as StateTypes from './stateTypes';

function reducer(state = {}, action){
    switch(action.type){
        case 'message':
            return { ...state, ...{message:action.data} };
        default:
            return state;
    }
}

function location(state = 'test', action) {
    return state;
}

function auth(state = { state: StateTypes.Authentication.UNAUTHENTICATED}, action) {
    switch (action.type) {
        case Actions.AUTH_REQUEST:
            return { ...state, ...{ state: StateTypes.Authentication.REQUESTED } };
        case Actions.AUTH_SUCCESS:
            return { ...state, ...{ state: StateTypes.Authentication.AUTHENTICATED } };
        case Actions.AUTH_FAILURE:
            return { ...state, ...{ state: StateTypes.Authentication.FAILED, errorInfo: action.errorInfo } };
        default:
            return state;
    }
}

const reduxApp = combineReducers({
    reducer,
    location,
    auth
});

export default reduxApp;