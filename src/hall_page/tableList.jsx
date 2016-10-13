import React from "react";
import {List, ListHeader} from "react-onsenui";
import TableListItem from "./tableListItem";

export default class TableList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tables: [
                {
                    id: 1,
                    agents: [{null, null, null, null, null}],
                    inGame: false
                }, {
                    id: 2,
                    agents: [{null, null, null, null, null}],
                    inGame: false
                }, {
                    id: 3,
                    agents: [{null, null, null, null, null}],
                    inGame: false
                }
            ]
        };
    }

    render() {
        return (
            <List
                dataSource={this.state.tables}
                renderRow={(table) => (
                    <TableListItem table={table} key={table.id}/>
                )}
                renderHeader={() => <ListHeader>全部桌子</ListHeader>} />
        )
    }
}
