/**
 * Created by liboyuan on 2016/10/13.
 */

import socket from '../socket.io/socket-client';
import ioreq from 'socket.io-request';

import * as RequestTypes from './requestTypes';
import * as Errors from './errors';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SOCKET_READY = 'SOCKET_READY';
export const SOCKET_TIMEOUT = 'SOCKET_TIMEOUT';
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';

export const GET_TABLE_REQUEST = 'GET_TABLE_REQUEST';
export const GET_TABLE_SUCCESS = 'GET_TABLE_SUCCESS';
export const GET_TABLE_FAILURE = 'GET_TABLE_FAILURE';

export const GET_GAME_REQUEST = 'GET_GAME_REQUEST';
export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS';
export const GET_GAME_FAILURE = 'GET_GAME_FAILURE';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const HALL_CHAT_RECEIVED = 'HALL_CHAT_RECEIVED';
export const HALL_CHAT_READ = 'HALL_CHAT_READ';
export const GAME_CHAT_RECEIVED = 'GAME_CHAT_RECEIVED';
export const GAME_CHAT_READ = 'GAME_CHAT_READ';

export const SEND_OPERATION_REQUEST = 'SEND_OPERATION_REQUEST';
export const SEND_OPERATION_SUCCESS = 'SEND_OPERATION_SUCCESS';
export const SEND_OPERATION_FAILURE = 'SEND_OPERATION_FAILURE';

export const TO_HALL_PAGE = 'TO_HALL_PAGE';
export const TO_GAME_PAGE = 'TO_GAME_PAGE';
export const TO_PLAYERS_PAGE = 'TO_PLAYERS_PAGE';
export const TO_SETTINGS_PAGE = 'TO_SETTINGS_PAGE';

export const ENTER_TABLE = 'ENTER_TABLE';
export const LEAVE_TABLE = 'LEAVE_TABLE';

export const GAME_SYNC_FAIL = 'GAME_SYNC_FAIL';
export const GAME_SYNC_ADD = 'GAME_SYNC_ADD';

export function socket_ready() { return { type: SOCKET_READY } }
export function socket_timeout() { return { type: SOCKET_TIMEOUT } }
export function socket_disconnect() { return { type: SOCKET_DISCONNECT } }

function auth_request(authType) {
    return {
        type: AUTH_REQUEST,
        authType: authType
    }
}

function auth_success(agent) {
    return {
        type: AUTH_SUCCESS,
        agent: agent
    }
}

function auth_failure(errorInfo) {
    return {
        type: AUTH_FAILURE,
        errorInfo: errorInfo
    }
}


/**
 * 验证身份，方式包括：
 * auth_code登录
 * 账号密码登录
 * 注册登录
 * @returns {function(*)}
 */
export function authenticate(content) {
    return dispatch => {
        dispatch(auth_request(content.type));
        ioreq(socket).request(RequestTypes.AUTH, content)
            .then(function (res) {
                if (!res.success) {
                    dispatch(auth_failure('请求出错，错误码： ' + res.errorCode));
                } else {
                    localStorage.authenticationCode = res.authenticationCode;
                    dispatch(auth_success(res.agent));
                }
            })
            .catch(function (err) {
                dispatch(auth_failure('请求出错： ' + (err.stack || err)));
            });
    }
}

function get_table_request() {
    return {type: GET_TABLE_REQUEST};
}

function get_table_success(content) {
    return {type: GET_TABLE_SUCCESS, content: content};
}

function get_table_failure(errorInfo) {
    return {type: GET_TABLE_FAILURE, errorInfo: errorInfo}
}

/**
 * 获取大厅信息，在加载大厅页面时触发
 * @returns {function(*)}
 */
export function get_tables() {
    return dispatch => {
        dispatch(get_table_request());
        ioreq(socket).request(RequestTypes.GET_TABLES, null)
            .then(function (res) {
                if (!res.success) {
                    if (Errors.isAuthError(res.errorCode))
                        dispatch(auth_failure(res.errorCode));
                    dispatch(get_table_failure('请求出错，错误码： ' + res.errorCode));
                } else {
                    dispatch(get_table_success(res.content));
                }
            })
            .catch(function (err) {
                dispatch(get_table_failure('请求出错： ' + (err.stack || err)));
            });
    }
}


function get_game_request() {
    return {type: GET_GAME_REQUEST};
}

function get_game_success(content) {
    return {type: GET_GAME_SUCCESS, content: content};
}

function get_game_failure(errorInfo) {
    return {type: GET_GAME_FAILURE, errorInfo: errorInfo}
}

/**
 * 获取游戏信息，在加载游戏页面时触发
 * @returns {function(*)}
 */
export function get_game() {
    return dispatch => {
        dispatch(get_game_request());
        ioreq(socket).request(RequestTypes.GET_GAME, null)
            .then(function (res) {
                if (!res.success) {
                    if (Errors.isAuthError(res.errorCode))
                        dispatch(auth_failure(res.errorCode));
                    dispatch(get_game_failure('请求出错，错误码： ' + res.errorCode));
                } else {
                    dispatch(get_game_success(res.content));
                }
            })
            .catch(function (err) {
                dispatch(get_game_failure('请求出错： ' + (err.stack || err)));
            });
    }
}


function send_message_request() {
    return {type: SEND_MESSAGE_REQUEST};
}

function send_message_success() {
    return {type: SEND_MESSAGE_SUCCESS};
}

function send_message_failure(errorInfo) {
    return {type: SEND_MESSAGE_FAILURE, errorInfo: errorInfo}
}

/**
 * 发送信息
 * message: { content: 内容 }
 * @returns {function(*)}
 */
export function send_message(message) {
    return dispatch => {
        dispatch(send_message_request());
        ioreq(socket).request(RequestTypes.CHAT, message)
            .then(function (res) {
                if (!res.success) {
                    if (Errors.isAuthError(res.errorCode))
                        dispatch(auth_failure(res.errorCode));
                    dispatch(send_message_failure('请求出错，错误码： ' + res.errorCode));
                } else {
                    dispatch(send_message_success());
                }
            })
            .catch(function (err) {
                dispatch(SEND_MESSAGE_FAILURE('请求出错： ' + (err.stack || err)));
            });
    }
}


/**
 * 聊天
 * @param chat
 * @returns {{type: string, chat: *}}
 */
export function hall_chat_received(chat) {
    return {type: HALL_CHAT_RECEIVED, chat: chat}
}

export function hall_chat_read() {
    return {type: HALL_CHAT_READ}
}

export function game_chat_received(chat) {
    return {type: GAME_CHAT_RECEIVED, chat: chat}
}

export function game_chat_read() {
    return {type: GAME_CHAT_READ}
}


/**
 * 操作
 * @returns {{type: string}}
 */
function send_operation_request() {
    return {type: SEND_OPERATION_REQUEST};
}

function send_operation_success() {
    return {type: SEND_OPERATION_SUCCESS};
}

function send_operation_failure(errorInfo) {
    return {type: SEND_OPERATION_FAILURE, errorInfo: errorInfo}
}


/**
 * 有关页面切换的操作
 * @returns {{type: string}}
 */
export function to_hall_page() {
    return {type: TO_HALL_PAGE}
}

export function to_game_page() {
    return {type: TO_GAME_PAGE}
}

export function to_players_page() {
    return {type: TO_PLAYERS_PAGE}
}

export function to_settings_page() {
    return {type: TO_SETTINGS_PAGE}
}



export function enter_table_success() {
    return {type: ENTER_TABLE}
}

/**
 * 加入桌子，成功后跳转
 * @param content
 * @returns {function(*)}
 */
export function enter_table(content) {
    return dispatch => {
        dispatch(send_operation_request());
        ioreq(socket).request(RequestTypes.ENTER_TABLE, content)
            .then(function (res) {
                if (!res.success) {
                    if (Errors.isAuthError(res.errorCode))
                        dispatch(auth_failure(res.errorCode));
                    dispatch(send_operation_failure('请求出错，错误码： ' + res.errorCode));
                } else {
                    dispatch(send_operation_success());
                    dispatch(enter_table_success());
                    //TODO 加入channel
                    dispatch(to_game_page());
                }
            })
            .catch(function (err) {
                dispatch(send_operation_failure('请求出错： ' + (err.stack || err)));
            });
    }
}


export function leave_table_success() {
    return {type: LEAVE_TABLE}
}

/**
 * 离开桌子
 * @returns {function(*)}
 */
export function leave_table() {
    return dispatch => {
        dispatch(send_operation_request());
        ioreq(socket).request(RequestTypes.LEAVE_TABLE)
            .then(function (res) {
                if (!res.success) {
                    if (Errors.isAuthError(res.errorCode))
                        dispatch(auth_failure(res.errorCode));
                    dispatch(send_operation_failure('请求出错，错误码： ' + res.errorCode));
                } else {
                    dispatch(send_operation_success());
                    dispatch(leave_table_success());
                    //TODO 离开channel
                    dispatch(to_hall_page());
                }
            })
            .catch(function (err) {
                dispatch(send_operation_failure('请求出错： ' + (err.stack || err)));
            });
    }
}


//TODO 这些没有写reducer
export function game_sync_fail() {
    return {type: GAME_SYNC_FAIL}
}

export function game_sync_add() {
    return {type: GAME_SYNC_ADD}
}

export function game_event_received(event) {
    return (dispatch, getState) => {
        let state = getState();
        if (event.serial != state.eventId) {
            dispatch(game_sync_fail());
            //TODO DISPATCH 获取游戏信息
        } else {
            dispatch(game_sync_add());
            switch (event.type) {
                //TODO 处理不同的请求
            }
        }

    }
}

export { socket };