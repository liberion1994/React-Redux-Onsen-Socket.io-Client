import React from "react";

import "./floatWindow.css";

export default class FloatWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fold: true
        };

    }

    render() {
        let position = {top: this.props.top + 'vh'};
        let float = {}; float[this.props.float] = 0;
        let tabStyle = {float: this.props.float};
        let contentStyle = {float: this.props.float};
        if (this.props.float == 'right') {
            contentStyle.borderBottomLeftRadius = '2vw';
            tabStyle.borderTopLeftRadius = tabStyle.borderBottomLeftRadius = '2vw';
        } else {
            contentStyle.borderBottomRightRadius = '2vw';
            tabStyle.borderTopRightRadius = tabStyle.borderBottomRightRadius = '2vw';
        }
        return (
            <div
                style={{...position, ...float}}
                className="wrapper">
                <div
                    className="content"
                    style={{...{width: this.state.fold ? 0 : '90vw', height: this.state.fold ? '8vh' : '40vh'}, ...contentStyle}}>
                    {this.props.content}
                </div>
                <div className="tab"
                     style={tabStyle}
                     onClick={() => {this.setState({fold : !this.state.fold})}}>
                    {this.props.tab}
                </div>
                <div className="noti"
                     style={this.props.float == 'right' ? {left: 0} : {right: 0}}
                ></div>
            </div>

        )
    }
}
