import React from "react";
import {Page, Toolbar, ToolbarButton, Icon} from "react-onsenui";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.showSideBar = this.showSideBar.bind(this);
    }

    showSideBar() {
        this.props.onToolBarButtonClicked();
    }

    render() {
        return (
            <Toolbar>
                <div className='left'>
                    <ToolbarButton onClick={this.showSideBar}>
                        <Icon icon='ion-navicon, material: md-menu' />
                    </ToolbarButton>
                </div>
                <div className='center'>
                    {this.props.currentPageName}
                </div>
            </Toolbar>
        )
    }
}
