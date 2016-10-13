import React from "react";

import { connect } from 'react-redux';

import {Splitter, SplitterContent} from "react-onsenui";
import HallPage from "./hall_page/hallPage";
import SidePanel from "./sidePanel";
import GamePage from "./game/gamePage";
import LoadingMask from "./common/loadingMask/loadingMask";

import SocketClient from './communication/socketClient';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidePanelShown: false,
            currentPageName: '大厅',
            responseTimeout: false
        };

        setTimeout(() => {
            this.setState({responseTimeout: true});
        }, 3000);

        // var tmp = new SocketClient('http://localhost:3000/');
        // tmp.request();

        this.onToolBarButtonClicked = this.onToolBarButtonClicked.bind(this);
        this.onPagePicked = this.onPagePicked.bind(this);
    }

    onToolBarButtonClicked() {
        this.setState({sidePanelShown: true});
    }

    onPagePicked(title) {
        this.setState({currentPageName: title, sidePanelShown: false});
    }

    render() {
        var loadingMask;
        if (this.state.responseTimeout)
            loadingMask = (<LoadingMask/>);
        var currentPage;
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
                    username="未知用户"
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

    }
}

export default connect(select)(App)