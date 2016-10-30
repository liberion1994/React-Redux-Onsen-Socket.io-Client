import React from "react";

import './table.css';

export default class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let seats = this.props.table.seatsOccupied.map((occupied, index) => {
            let className = (occupied ? "seat-occupied" : "seat") + " seat" + (index + 1);
            return <div
                key={index + 1}
                className={className}
                onClick={() => {this.props.enter(index)}}
            >
            </div>;
        });
        return (
            <div className="table-whole">
                <div className="table">第{this.props.table.id}桌</div>
                {seats}
            </div>
        )
    }
}
