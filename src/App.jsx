import React from "react";
import {connect} from "react-redux";
import {Splitter, SplitterContent} from "react-onsenui";
import HallPage from "./hall_page/hallPage";
import SidePanel from "./sidePanel";
import GamePage from "./game/gamePage";
import LoginPage from "./login_page/loginPage";
import LoadingMask from "./common/loadingMask/loadingMask";

import * as StateTypes from "./redux/stateTypes";
import * as Actions from "./redux/actions";
import * as RequestTypes from './redux/requestTypes';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidePanelShown: false,
            currentPageName: '大厅',
            responseTimeout: false
        };

        // setTimeout(() => {
        //     this.setState({responseTimeout: true});
        // }, 3000);

        this.onToolBarButtonClicked = this.onToolBarButtonClicked.bind(this);
        this.onPagePicked = this.onPagePicked.bind(this);
        this.requestLogin = this.requestLogin.bind(this);
        this.requestRegister = this.requestRegister.bind(this);
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

    render() {
        let loadingMask;
        if (this.props.socket.state == StateTypes.Socket.DISCONNECTED)
            loadingMask = (<LoadingMask/>);

        if (this.props.auth.state != StateTypes.Authentication.AUTHENTICATED) {
            return (
                <div>
                    <LoginPage requestLogin={this.requestLogin} requestRegister={this.requestRegister} />
                    {loadingMask}
                </div>)
        }
        let currentPage;
        switch(this.state.currentPageName) {
            case '大厅':
                currentPage = (<HallPage onToolBarButtonClicked={this.onToolBarButtonClicked} />);
                break;
            case '游戏':
                currentPage = (<GamePage />);
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
                    {currentPage}
                </SplitterContent>
                {loadingMask}
            </Splitter>
        );
    }
}

function select(state) {
    return {
        auth: state.auth,
        socket: state.socket
    }
}

export default connect(select)(App)