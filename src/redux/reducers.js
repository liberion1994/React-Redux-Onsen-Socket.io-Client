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

function auth(state = {
    state: StateTypes.Authentication.UNAUTHENTICATED,
    username: '未登录'
}, action) {
    switch (action.type) {
        case Actions.AUTH_REQUEST:
            return { ...state, ...{ state: StateTypes.Authentication.REQUESTED, authType: action.authType } };
        case Actions.AUTH_SUCCESS:
            return { ...state, ...{ state: StateTypes.Authentication.AUTHENTICATED, username: action.username } };
        case Actions.AUTH_FAILURE:
            return { ...state, ...{ state: StateTypes.Authentication.FAILED, errorInfo: action.errorInfo } };
        default:
            return state;
    }
}

function socket(state = {state: StateTypes.Socket.DISCONNECTED}, action) {
    switch (action.type) {
        case Actions.SOCKET_READY:
            return { ...state, ...{ state: StateTypes.Socket.CONNECTED } };
        case Actions.SOCKET_DISCONNECT:
            return { ...state, ...{ state: StateTypes.Socket.DISCONNECTED } };
        default:
            return state;
    }
}

const reduxApp = combineReducers({
    reducer,
    socket,
    auth
});

export default reduxApp;