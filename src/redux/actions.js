/**
 * Created by liboyuan on 2016/10/13.
 */

import socket from '../socket.io/socket-client';
import ioreq from 'socket.io-request';

import * as RequestTypes from './requestTypes';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

function auth_request() {
    return {
        type: AUTH_REQUEST
    }
}

function auth_success() {
    return {
        type: AUTH_SUCCESS
    }
}

function auth_failure(errorInfo) {
    return {
        type: AUTH_FAILURE,
        errorInfo: errorInfo
    }
}

function login(dispatch) {
    if (!localStorage.username || !localStorage.password) {
        dispatch(auth_failure('没有找到本地账户信息'));
    } else {
        ioreq(socket).request(RequestTypes.AUTH, {
            username: localStorage.username,
            password: localStorage.password
        })
            .then(function(res){
                dispatch(auth_success());
            })
            .catch(function(err){
                dispatch(auth_failure(err.stack || err));
            });
    }
}

/**
 * 验证身份，如果本地存储了验证信息，则直接发送验证请求
 * 请求失败或者本地无验证信息，则发送登录请求（如果本地有账号密码）
 * @returns {function(*)}
 */
export function authenticate() {
    if (localStorage.authenticationCode) {
        return dispatch => {
            dispatch(auth_request());
            ioreq(socket).request(RequestTypes.AUTH, {authenticationCode: localStorage.authenticationCode})
                .then(function(res){
                    dispatch(auth_success());
                })
                .catch(function(){
                    login(dispatch);
                });
        }
    }
    return login;
}