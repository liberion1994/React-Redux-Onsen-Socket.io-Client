import React from "react";
import {ListItem, Icon} from "react-onsenui";

import HidableItem from './hidableItem';


import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class FoldableListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fold: true
        };

        this.handleFold = this.handleFold.bind(this);
    }

    handleFold() {
        this.setState({fold: !this.state.fold});
    }

    render() {
        var iconStyle = {
            position: 'absolute',
            right: '5px',
            top: '10px',
            transition: 'transform .5s ease'
        };
        if (!this.state.fold) {
            iconStyle.transform = 'rotate(180deg)';
        }
        return (
            <ListItem tappable>
                <div style={{width: '100%'}}>
                    {this.props.mainInfo}
                </div>
                <HidableItem show={!this.state.fold} content={this.props.detail} />
                <Icon
                    icon="fa-angle-down"
                    style={iconStyle}
                    onClick={this.handleFold}
                />
            </ListItem>
        )
    }
}
