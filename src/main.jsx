import 'react-hot-loader/patch';
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import socket from './socket.io/socket-client';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSocketIoMiddleware from 'redux-socket.io';
import reduxThunk from 'redux-thunk';
import * as Actions from './redux/actions';

// Onsen UI Styling and Icons
require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');

import App from './App';
import reduxApp from './redux/reducers'

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
let store = createStore(reduxApp,
    applyMiddleware(
        socketIoMiddleware,
        reduxThunk
    ));
store.subscribe(()=>{
    console.log('new client state', store.getState());
});
store.dispatch({type:'server/hello', data:'Hello!'});
store.dispatch(Actions.authenticate());

const rootElement = document.getElementById('app');
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    rootElement
);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(
            <AppContainer>
                <Provider store="store">
                    <NextApp />
                </Provider>
            </AppContainer>,
      rootElement
    );
  });
}
