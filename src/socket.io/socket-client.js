/**
 * Created by liboyuan on 2016/10/13.
 */

import io from "socket.io-client";
import * as Actions from "../redux/actions";
import * as RequestTypes from "../redux/requestTypes";
import * as MessageTypes from "./messageTypes";

let socket = io('http://localhost:3000');

socket.init = function (store) {
    socket.on('connect', function () {
        store.dispatch(Actions.socket_ready());
        store.dispatch(Actions.authenticate({
            type: RequestTypes.AUTH_TYPES.AUTH_CODE,
            authenticationCode: localStorage.authenticationCode
        }));

        socket.on('disconnect', function () {
            store.dispatch(Actions.socket_disconnect());
        });

        socket.on(MessageTypes.CHAT, function (chat) {
            console.log(chat);
            //TODO dispatch here，channel可以有已读状态，便于红点通知
            store.dispatch(Actions.hall_chat_received(chat));
        })

    });
};

export default socket;