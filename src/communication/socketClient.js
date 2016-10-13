/**
 * Created by liboyuan on 2016/10/11.
 */
import io from 'socket.io-client';
import ioreq from 'socket.io-request';

export const INSTRUCTION_EMIT_TYPE = {
    REQUEST: 0,
    COMMAND: 1
};

export const INSTRUCTION_RECEIVE_TYPE = {
    RESPONSE: 0,
    EVENT: 1
};

export const REQUEST_TYPE = {
    AUTH: 0,
    DATA: 1
};

export default class SocketClient {
    constructor(url) {
        this.socket = io(url);
        this.socket
            .on("connect", () => {

            });
    }

    request() {
        ioreq(this.socket).request("toUpper", "hello world") // method, data
            .then(function(res){
                console.log(res); // get "HELLO WORLD"
            })
            .catch(function(err){
                console.error(err.stack || err);
            });
    }

}
//
// var SocketClient = function (url) {
//     this.socket = io(url);
//
//     this.retryTimes = 10;
//     this.timeoutPerTime = 1000;
//
//     this.instructionSerial = 0;
//     this.waitingForResponse = false;
//
//     this.socketRequest = function (content) {
//         if (this.waitingForResponse) {
//
//         }
//         //TODO
//         this.socket.emit(INSTRUCTION_EMIT_TYPE.REQUEST, {
//             instructionSerial: this.instructionSerial,
//             content: content
//         });
//         this.waitingForResponse = true;
//     };
//
//
//     var self = this;
//     this.socket.on(INSTRUCTION_RECEIVE_TYPE.RESPONSE, function (response) {
//         if (response.instructionSerial != self.instructionSerial) {
//
//         }
//     });
//
//     this.foo = function () {
//         console.log('foo');
//     }
// };
//
// module.exports = new SocketClient('http://localhost:3000/');