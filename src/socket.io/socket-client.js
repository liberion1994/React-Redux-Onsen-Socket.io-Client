/**
 * Created by liboyuan on 2016/10/13.
 */

import io from "socket.io-client";
import * as Actions from "../redux/actions";
import * as RequestTypes from "../redux/requestTypes";
import * as MessageTypes from "./messageTypes";
import * as Channels from "../redux/channels";

let socket = io('http://localhost:3000');

socket.init = function (store) {

    setTimeout(() => {store.dispatch(Actions.socket_timeout())}, 3000);

    socket.on('connect', () => {
        store.dispatch(Actions.socket_ready());
        if (localStorage.authenticationCode) {
            store.dispatch(Actions.authenticate({
                type: RequestTypes.AUTH_TYPES.AUTH_CODE,
                authenticationCode: localStorage.authenticationCode
            }));
        }
    });

    /**
     * 这些操作需要写在外面
     * socket.io存在一个bug，当连接断开后，会再次调用on connect，导致又一次注册事件，
     * 这就会导致server发一个消息，client作出多次响应，很糟糕
     */

    socket.on('disconnect', () => {
        store.dispatch(Actions.socket_disconnect());
    });

    socket.on(MessageTypes.CHAT, (chat) => {
        store.dispatch(Actions.hall_chat_received(chat));
    });

    socket.on(MessageTypes.EVENT, (event) => {
        switch (event.channelName) {
            case Channels.CHANNEL_HALL:
                // store.dispatch();
                //TODO
                break;
            default:
                break;
        }

    });
};

export default socket;