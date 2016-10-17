import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Page} from "react-onsenui";

import Navbar from "../common/navbar";
import Table from "./table";

import '../css/transition.css';

export default class HallPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.onToolBarButtonClicked = this.onToolBarButtonClicked.bind(this);
    }

    componentDidMount() {
        this.props.loadData();
    }

    onToolBarButtonClicked() {
        this.props.onToolBarButtonClicked();
    }

    render() {
        let tables = this.props.hall.content ? this.props.hall.content.tables.map((table) => {
            return <Table key={table.id} table={table}/>;
        }) : null;
        return (
            <Page renderToolbar={() => <Navbar onToolBarButtonClicked={this.onToolBarButtonClicked} currentPageName='大厅' />}>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {tables}
                </ReactCSSTransitionGroup>
            </Page>
        )
    }
}
