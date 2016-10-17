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
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';

export const GET_TABLE_REQUEST = 'GET_TABLE_REQUEST';
export const GET_TABLE_SUCCESS = 'GET_TABLE_SUCCESS';
export const GET_TABLE_FAILURE = 'GET_TABLE_FAILURE';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const HALL_CHAT_RECEIVED = 'HALL_CHAT_RECEIVED';
export const HALL_CHAT_READ = 'HALL_CHAT_READ';
export const GAME_CHAT_RECEIVED = 'GAME_CHAT_RECEIVED';
export const GAME_CHAT_READ = 'GAME_CHAT_READ';

export function socket_ready() { return { type: SOCKET_READY } }
export function socket_disconnect() { return { type: SOCKET_DISCONNECT } }

function auth_request(authType) {
    return {
        type: AUTH_REQUEST,
        authType: authType
    }
}

function auth_success(username) {
    return {
        type: AUTH_SUCCESS,
        username: username
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
        let done = false;
        setTimeout(() => {if (!done) dispatch(auth_request(content.type))}, 1000);
        ioreq(socket).request(RequestTypes.AUTH, content)
            .then(function (res) {
                done = true;
                if (!res.success) {
                    dispatch(auth_failure('请求出错，错误码： ' + res.errorCode));
                } else {
                    localStorage.authenticationCode = res.authenticationCode;
                    dispatch(auth_success(res.username));
                }
            })
            .catch(function (err) {
                done = true;
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
                    dispatch(send_message_success(res));
                }
            })
            .catch(function (err) {
                dispatch(get_table_failure('请求出错： ' + (err.stack || err)));
            });
    }
}


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

export { socket };