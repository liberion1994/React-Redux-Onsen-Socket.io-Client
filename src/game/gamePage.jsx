import React from "react";
import {Page, Toolbar} from "react-onsenui";

export default class GamePage extends React.Component {
    renderToolbar() {
        return (
            <Toolbar>
                <div className='center'>Page</div>
            </Toolbar>
        )
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <section style={{margin: '16px'}}>
                    This is a page
                </section>
            </Page>
        )
    }
}
