import "react-hot-loader/patch";
import {AppContainer} from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import reduxApp from "./redux/reducers";
import socket from "./socket.io/socket-client";

// Onsen UI Styling and Icons
require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');

let store = createStore(reduxApp,
    applyMiddleware(
        reduxThunk
    ));
store.subscribe(()=>{
    console.log('new client state', store.getState());
});

socket.init(store);


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
