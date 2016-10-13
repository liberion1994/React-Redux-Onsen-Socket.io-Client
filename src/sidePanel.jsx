import React from "react";
import {SplitterSide, Page, List, ListItem, Icon, ListHeader} from "react-onsenui";

export default class SidePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }

    hide() {
        this.setState({isOpen: false});
    }

    show() {
        this.setState({isOpen: true});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isOpen: nextProps.sidePanelShown});
    }

    componentDidMount() {

    }

    pickPageItem(title) {
        this.props.onPagePicked(title);
    }

    render() {
        return (
            <SplitterSide
                style={{
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                }}
                side='left'
                width={200}
                collapse={true}
                isSwipeable={true}
                isOpen={this.state.isOpen}
                onClose={this.hide}
                onOpen={this.show}>
                <Page>
                    <List
                        dataSource={[
                            {title: '大厅', icon: 'fa-home'},
                            {title: '游戏', icon: 'fa-gamepad'},
                            {title: '玩家', icon: 'fa-users'},
                            {title: '设置', icon: 'fa-gear'},
                            {title: '登出', icon: 'fa-sign-out'}
                        ]}
                        renderRow={(item) => (
                            <ListItem key={item.title} onClick={this.pickPageItem.bind(this, item.title)} tappable>
                                <Icon icon={item.icon}>
                                </Icon>&nbsp;{item.title}
                            </ListItem>
                        )}
                        renderHeader={() => <ListHeader>{this.props.username}</ListHeader>}
                    />
                </Page>
            </SplitterSide>
        )
    }
}
