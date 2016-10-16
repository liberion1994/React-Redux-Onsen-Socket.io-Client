import React from "react";
import {connect} from "react-redux";
import {Splitter, SplitterContent} from "react-onsenui";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HallPage from "./hall_page/hallPage";
import SidePanel from "./sidePanel";
import GamePage from "./game/gamePage";
import LoginPage from "./login_page/loginPage";
import LoadingMask from "./common/loadingMask/loadingMask";
import FloatWindow from "./common/floatWindow/floatWindow";

import * as StateTypes from "./redux/stateTypes";
import * as Actions from "./redux/actions";
import * as RequestTypes from './redux/requestTypes';

import './css/transition.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidePanelShown: false,
            currentPageName: '大厅',
            responseTimeout: false
        };

        this.onToolBarButtonClicked = this.onToolBarButtonClicked.bind(this);
        this.onPagePicked = this.onPagePicked.bind(this);
        this.requestLogin = this.requestLogin.bind(this);
        this.requestRegister = this.requestRegister.bind(this);
        this.loadHallInfo = this.loadHallInfo.bind(this);
    }

    onToolBarButtonClicked() {
        this.setState({sidePanelShown: true});
    }

    onPagePicked(title) {
        this.setState({currentPageName: title, sidePanelShown: false});
    }

    requestLogin(username, password) {
        this.props.dispatch(Actions.authenticate(
            {type: RequestTypes.AUTH_TYPES.LOGIN, username: username, password: password}));
    }

    requestRegister(username, password) {
        this.props.dispatch(Actions.authenticate(
            {type: RequestTypes.AUTH_TYPES.REG_AND_LOGIN, username: username, password: password}));
    }

    loadHallInfo() {
        if (this.props.hall.state != StateTypes.Hall.FETCHED)
            this.props.dispatch(Actions.get_tables());
    }

    render() {
        let loadingMask;
        if (this.props.socket.state == StateTypes.Socket.DISCONNECTED)
            loadingMask = (<LoadingMask message="连接至服务器"/>);
        if (this.props.auth.state == StateTypes.Authentication.REQUESTED)
            loadingMask = (<LoadingMask message="登陆中..."/>);
        if (this.props.auth.state != StateTypes.Authentication.AUTHENTICATED) {
            return (
                <div>
                    <LoginPage
                        errorInfo={this.props.auth.errorInfo}
                        requestLogin={this.requestLogin}
                        requestRegister={this.requestRegister} />
                    {loadingMask}
                </div>)
        }
        let currentPage;
        switch(this.state.currentPageName) {
            case '大厅':
                currentPage = (
                    <HallPage
                        key={this.state.currentPageName}
                        hall={this.props.hall}
                        loadData={this.loadHallInfo}
                        onToolBarButtonClicked={this.onToolBarButtonClicked}
                    />);
                break;
            case '游戏':
                currentPage = (
                    <GamePage
                        key={this.state.currentPageName}
                        onToolBarButtonClicked={this.onToolBarButtonClicked}
                    />);
                break;
            default:
                break;
        }
        return (
            <Splitter>
                <SidePanel
                    onPagePicked={this.onPagePicked}
                    sidePanelShown={this.state.sidePanelShown}
                    username={this.props.auth.username}
                />
                <SplitterContent>
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        {currentPage}
                    </ReactCSSTransitionGroup>
                </SplitterContent>
                {loadingMask}
                <FloatWindow
                    top={10}
                    float="right"
                    tab="大厅"
                    content=""
                />
                <FloatWindow
                    top={20}
                    float="right"
                    tab="游戏"
                    content=""
                />
            </Splitter>
        );
    }
}

//TODO 写一个select全体是否在通信中的select函数

function select(state) {
    return {
        auth: state.auth,
        socket: state.socket,
        hall: state.hall
    }
}

export default connect(select)(App)