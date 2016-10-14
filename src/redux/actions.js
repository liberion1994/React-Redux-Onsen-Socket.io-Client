/**
 * Created by liboyuan on 2016/10/13.
 */

import socket from '../socket.io/socket-client';
import ioreq from 'socket.io-request';

import * as RequestTypes from './requestTypes';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SOCKET_READY = 'SOCKET_READY';
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';

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
        dispatch(auth_request(content.type));
        ioreq(socket).request(RequestTypes.AUTH, content)
            .then(function (res) {
                if (!res.success) {
                    dispatch(auth_failure('请求出错: ' + res.errorInfo));
                } else {
                    localStorage.authenticationCode = res.authenticationCode;
                    dispatch(auth_success(res.username));
                }
                //TODO set localstorage here
            })
            .catch(function (err) {
                dispatch(auth_failure('请求出错: ' + (err.stack || err)));
            });
    }
}

export { socket };