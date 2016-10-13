import React from "react";
import {ListItem, Row, Col, Button} from "react-onsenui";
import FoldableListItem from "../common/foldableListItem/foldableListItem";

export default class TableListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fold: true
        };

        this.handleFold = this.handleFold.bind(this);
    }

    handleFold() {
        console.log('click');
        this.setState({fold: !this.state.fold});
    }

    render() {

        var mainInfo = (
            <Row>
                <Col width="25%">第{this.props.table.id}桌</Col>
                <Col width="50%">{this.props.table.agents[0] ? '空座位' : table.agents[0].username}</Col>
                <Col width="25%">
                </Col>
            </Row>
        );
        return (
            <FoldableListItem mainInfo={mainInfo} detail={<div>detail</div>}>

            </FoldableListItem>
        )
    }
}
