import React from "react";
import {connect} from "react-redux";
import {Splitter, SplitterContent} from "react-onsenui";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HallPage from "./hall_page/hallPage";
import SidePanel from "./sidePanel";
import GamePage from "./game_page/gamePage";
import WelcomePage from "./welcome_page/welcomePage"
import LoginPage from "./login_page/loginPage";
import LoadingMask from "./common/loadingMask/loadingMask";
import ChannelWindow from "./common/channelWindow/channelWindow";

import * as StateTypes from "./redux/stateTypes";
import * as Actions from "./redux/actions";
import * as RequestTypes from './redux/requestTypes';

import './css/transition.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidePanelShown: false
        };

        this.onPagePicked = this.onPagePicked.bind(this);
    }

    onPagePicked(title) {
        switch (title) {
            case '大厅':
                this.props.dispatch(Actions.to_hall_page());
                break;
            case '游戏':
                this.props.dispatch(Actions.to_game_page());
                break;
            case '玩家':
                this.props.dispatch(Actions.to_players_page());
                break;
            case '设置':
                this.props.dispatch(Actions.to_settings_page());
                break;
            //TODO 登出
        }
        this.setState({sidePanelShown: false});
    }

    render() {
        let loadingMask;
        if (this.props.socket.state == StateTypes.Socket.TIMEOUT)
            loadingMask = (<LoadingMask message="连接至服务器"/>);

        if (this.props.auth.state == StateTypes.Authentication.UNAUTHENTICATED) {
            //初始状态，加载一个欢迎页面
            return (
                <div>
                    <WelcomePage />
                    {loadingMask}
                </div>
            )
        }
        if (this.props.auth.state != StateTypes.Authentication.AUTHENTICATED) {
            return (
                <div>
                    <LoginPage
                        auth={this.props.auth}
                        requestLogin={(username, password) => {
                            this.props.dispatch(Actions.authenticate(
                                {type: RequestTypes.AUTH_TYPES.LOGIN, username: username, password: password}));
                        }}
                        requestRegister={(username, password) => {
                            this.props.dispatch(Actions.authenticate(
                                {type: RequestTypes.AUTH_TYPES.REG_AND_LOGIN, username: username, password: password}));
                        }}
                    />
                    {loadingMask}
                </div>
            )
        }

        let currentPage;
        switch(this.props.pageLocation.state) {
            case StateTypes.PageLocation.HALL:
                currentPage = (
                    <HallPage
                        key={this.props.pageLocation}
                        hall={this.props.hall}
                        loadData={() => {
                            if (this.props.hall.state != StateTypes.Hall.FETCHED)
                                this.props.dispatch(Actions.get_tables());
                        }}
                        onToolBarButtonClicked={() => {this.setState({sidePanelShown: true})}}
                        onEnterTable={(content) => {this.props.dispatch(Actions.enter_table(content))}}
                    />);
                break;
            case StateTypes.PageLocation.GAME:
                currentPage = (
                    <GamePage
                        key={this.props.pageLocation}
                        game={this.props.game}
                        loadData={() => {
                            if (this.props.game.state != StateTypes.Game.FETCHED)
                                this.props.dispatch(Actions.get_game());
                        }}
                        onToolBarButtonClicked={() => {this.setState({sidePanelShown: true})}}
                        onLeaveTable={() => {this.props.dispatch(Actions.leave_table())}}
                    />);
                break;
            default:
                break;
        }
        let chats = [];
        let events = [];
        return (
            <Splitter>
                <SidePanel
                    onPagePicked={this.onPagePicked}
                    sidePanelShown={this.state.sidePanelShown}
                    username={this.props.agent.username}
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
                <ChannelWindow
                    top={10}
                    float="right"
                    channelName="大厅"
                    chats={this.props.hall.chats}
                    events={chats}
                    onMessageSent={(message) => {this.props.dispatch(Actions.send_message(message))}}
                    onFoldChange={(newState) => {this.props.dispatch(Actions.hall_chat_read())}}
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
        agent: state.agent,
        hall: state.hall,
        game: state.game,
        pageLocation: state.pageLocation
    }
}

export default connect(select)(App)