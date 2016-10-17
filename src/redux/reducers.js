/**
 * Created by liboyuan on 2016/10/12.
 */

import { combineReducers } from 'redux'
import * as Actions from './actions';
import * as StateTypes from './stateTypes';


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

function hall(state = {
    state: StateTypes.Hall.UNFETCHED,
    content: null,
    chats: {newArrived: false, content: []}
}, action) {
    switch (action.type) {
        case Actions.GET_TABLE_REQUEST:
            return { ...state, ...{ state: StateTypes.Hall.REQUESTED } };
        case Actions.GET_TABLE_SUCCESS:
            return { ...state, ...{ state: StateTypes.Hall.FETCHED, content: action.content } };
        case Actions.AUTH_FAILURE:
            return { ...state, ...{ state: StateTypes.Hall.FAILED, errorInfo: action.errorInfo } };
        case Actions.HALL_CHAT_RECEIVED:
            return { ...state, ...{ chats: { newArrived: true, content: [...state.chats.content, action.chat]} } };
        case Actions.HALL_CHAT_READ:
            return { ...state, ...{ chats: { ...state.chats, ...{ newArrived: false } } } };
        default:
            return state;
    }
}

function messageSent(state = {state: StateTypes.MessageSent.NONE_OR_DONE}, action) {
    switch (action.type) {
        case Actions.SEND_MESSAGE_REQUEST:
            return { ...state, ...{ state: StateTypes.MessageSent.REQUESTED } };
        case Actions.SEND_MESSAGE_SUCCESS:
            return { ...state, ...{ state: StateTypes.MessageSent.NONE_OR_DONE } };
        case Actions.SEND_MESSAGE_FAILURE:
            return { ...state, ...{ state: StateTypes.MessageSent.FAILED, errorInfo: action.errorInfo } };
        default:
            return state;
    }
}

const reduxApp = combineReducers({
    socket,
    auth,
    hall,
    messageSent
});

export default reduxApp;