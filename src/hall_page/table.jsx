import React from "react";

import './table.css';

export default class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="table-whole">
                <div className="table">第{this.props.table.id}桌</div>
                <div className="seat seat1"></div>
                <div className="seat seat2"></div>
                <div className="seat seat3"></div>
                <div className="seat seat4"></div>
                <div className="seat seat5"></div>
            </div>
        )
    }
}
