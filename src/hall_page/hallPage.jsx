import React from "react";
import {Page, PullHook} from "react-onsenui";
import Navbar from "../common/navbar";
import TableList from "./tableList";


export default class HallPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pullToRefreshState: 'initial',
            username: '345'
        };

        this.onToolBarButtonClicked = this.onToolBarButtonClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {

    }

    onToolBarButtonClicked() {
        this.props.onToolBarButtonClicked();
    }

    handleChange(e) {
        this.setState({pullToRefreshState: e.state});
    }

    handleLoad(done) {
        setTimeout(() => {
            done();
        }, 2000);
    }

    getPullToRefreshDisplay() {
        switch (this.state.pullToRefreshState) {
            case 'initial':
                return '哎哎哎别拉别拉';
            case 'preaction':
                return '快松手啦';
            case 'action':
                return (<div><i className="fa fa-spinner fa-spin fa-fw"></i>又要刷新了</div>);
        }
    }

    render() {

        return (
            <Page renderToolbar={() => <Navbar onToolBarButtonClicked={this.onToolBarButtonClicked} currentPageName='大厅' />}>
                <PullHook
                    onChange={this.handleChange}
                    onLoad={this.handleLoad}
                >
                    {this.getPullToRefreshDisplay()}
                </PullHook>
                <TableList/>
            </Page>
        )
    }
}
