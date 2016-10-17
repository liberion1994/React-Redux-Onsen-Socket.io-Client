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
        let translate = {transform: 'translateX(0)'};
        if (this.props.float == 'right') {
            contentStyle.borderBottomLeftRadius = '2vw';
            if (this.state.fold)
                translate.transform = 'translateX(90vw)';
            tabStyle.borderTopLeftRadius = tabStyle.borderBottomLeftRadius = '2vw';
        } else {
            contentStyle.borderBottomRightRadius = '2vw';
            if (this.state.fold)
                translate.transform = 'translateX(-90vw)';
            else
                contentStyle.transform = 'translateX(0)';
            tabStyle.borderTopRightRadius = tabStyle.borderBottomRightRadius = '2vw';
        }

        let noti;
        if (this.state.fold && this.props.newArrived)
            noti= <div className="noti" style={this.props.float == 'right' ? {left: 0} : {right: 0}}></div>;
        return (
            <div
                style={{...position, ...float, ...translate}}
                className="wrapper">
                <div
                    className="content"
                    style={contentStyle}>
                    {this.props.content}
                </div>
                <div className="tab"
                     style={tabStyle}
                     onClick={() => {this.setState({fold : !this.state.fold}); this.props.onFoldChange(this.state.fold);}}>
                    {this.props.tab}
                </div>
                {noti}
            </div>

        )
    }
}
