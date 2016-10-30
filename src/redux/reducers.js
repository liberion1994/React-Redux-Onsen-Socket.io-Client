/**
 * Created by liboyuan on 2016/10/12.
 */

import { combineReducers } from 'redux'
import * as Actions from './actions';
import * as StateTypes from './stateTypes';


function auth(state = {state: StateTypes.Authentication.UNAUTHENTICATED}, action) {
    switch (action.type) {
        case Actions.AUTH_REQUEST:
            return { ...state, ...{ state: StateTypes.Authentication.REQUESTED, authType: action.authType } };
        case Actions.AUTH_SUCCESS:
            return { ...state, ...{ state: StateTypes.Authentication.AUTHENTICATED } };
        case Actions.AUTH_FAILURE:
            return { ...state, ...{ state: StateTypes.Authentication.FAILED, errorInfo: action.errorInfo } };
        default:
            return state;
    }
}

function pageLocation(state = {state: StateTypes.PageLocation.HALL}, action) {
    switch (action.type) {
        case Actions.TO_HALL_PAGE:
            return { ...state, ...{ state: StateTypes.PageLocation.HALL } };
        case Actions.TO_GAME_PAGE:
            return { ...state, ...{ state: StateTypes.PageLocation.GAME } };
        case Actions.TO_PLAYERS_PAGE:
            return { ...state, ...{ state: StateTypes.PageLocation.PLAYERS } };
        case Actions.TO_SETTINGS_PAGE:
            return { ...state, ...{ state: StateTypes.PageLocation.SETTINGS } };
        default:
            return state;
    }
}

function socket(state = {state: StateTypes.Socket.UNINITIATED}, action) {
    switch (action.type) {
        case Actions.SOCKET_READY:
            return { ...state, ...{ state: StateTypes.Socket.CONNECTED } };
        case Actions.SOCKET_TIMEOUT:
            if (state.state == StateTypes.Socket.CONNECTED)
                return state;
            return { ...state, ...{ state: StateTypes.Socket.TIMEOUT } };
        case Actions.SOCKET_DISCONNECT:
            return { ...state, ...{ state: StateTypes.Socket.DISCONNECTED } };
        default:
            return state;
    }
}

function agent(state = {
    state: StateTypes.AgentStatus.UNINITIATED,
    username: '未登录',
    majorNumber: 2
}, action) {
    switch (action.type) {
        case Actions.AUTH_SUCCESS:
            return { ...state, ...action.agent };
        case Actions.ENTER_TABLE:
            return { ...state, ...{ state: StateTypes.AgentStatus.UNPREPARED } };
        case Actions.LEAVE_TABLE:
            return { ...state, ...{ state: StateTypes.AgentStatus.HALL } };
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
        case Actions.GET_TABLE_FAILURE:
            return { ...state, ...{ state: StateTypes.Hall.FAILED, errorInfo: action.errorInfo } };
        case Actions.HALL_CHAT_RECEIVED:
            return { ...state, ...{ chats: { newArrived: true, content: [...state.chats.content, action.chat]} } };
        case Actions.HALL_CHAT_READ:
            return { ...state, ...{ chats: { ...state.chats, ...{ newArrived: false } } } };
        default:
            return state;
    }
}

function game(state = {
    state: StateTypes.Game.UNFETCHED,
    content: null
}, action) {
    switch (action.type) {
        case Actions.GET_GAME_REQUEST:
            return { ...state, ...{ state: StateTypes.Game.REQUESTED } };
        case Actions.GET_GAME_SUCCESS:
            return { ...state, ...{ state: StateTypes.Game.FETCHED, content: action.content } };
        case Actions.GET_GAME_FAILURE:
            return { ...state, ...{ state: StateTypes.Game.FAILED, errorInfo: action.errorInfo } };
        case Actions.LEAVE_TABLE:
            return { ...state, ...{ state: StateTypes.Game.NONE } };
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

function operationSent(state = {state: StateTypes.OperationSent.NONE_OR_DONE}, action) {
    switch (action.type) {
        case Actions.SEND_OPERATION_REQUEST:
            return { ...state, ...{ state: StateTypes.OperationSent.REQUESTED } };
        case Actions.SEND_OPERATION_SUCCESS:
            return { ...state, ...{ state: StateTypes.OperationSent.NONE_OR_DONE } };
        case Actions.SEND_OPERATION_FAILURE:
            return { ...state, ...{ state: StateTypes.OperationSent.FAILED, errorInfo: action.errorInfo } };
        default:
            return state;
    }
}

const reduxApp = combineReducers({
    socket,
    auth,
    pageLocation,
    agent,
    hall,
    game,
    messageSent,
    operationSent
});

export default reduxApp;