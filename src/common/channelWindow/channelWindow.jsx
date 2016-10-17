import React from "react";
import {Row, Col, Input, Button} from "react-onsenui";
import FloatWindow from "../floatWindow/floatWindow";
import ons from "onsenui"

export default class ChannelWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: null
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        if (!this.state.text || this.state.text == '') {
            ons.notification.alert({message: '发送内容不能为空', title: '出错了'});
        } else {
            this.props.onMessageSent({content: this.state.text, channelName: this.props.channelName});
            this.setState({text: null});
        }
    }

    render() {
        let chats = this.props.chats.content.map((message) => {
            return (
                <div key={message.serial}>
                    [{message.from}]:{message.content}
                </div>
            )
        });
        let events = this.props.events.map((event) => {
            return (
                <div key={event.serial}>
                    [{event.from}]:{event.content}
                </div>
            )
        });
        let content = (
            <div style={{
                height: '100%',
                display: 'flex',
                flexFlow: 'column',
                borderRadius: 'inherit',
                fontSize: '10px',
                lineHeight: '14px'
            }}>
                <Row style={{flex: '1 1 auto'}}>
                    <Col width="50%">
                        <div style={{padding: '0 5px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                            <div style={{flex: '0 1 auto'}}><p>事件</p></div>
                            <div style={{flex: '1 1 auto', overflow: 'scroll', wordWrap: 'break-word'}}>{events}</div>
                        </div>
                    </Col>
                    <Col width="50%">
                        <div style={{padding: '0 5px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                            <div style={{flex: '0 1 auto'}}><p>聊天</p></div>
                            <div style={{flex: '1 1 auto', overflow: 'scroll', wordWrap: 'break-word'}}>{chats}</div>
                        </div>
                    </Col>
                </Row>
                <div style={{
                    flex: '0 1 auto',
                    padding: '1vw 1vw',
                    background: 'white',
                    borderRadius: 'inherit'
                }}>
                    <Input
                        value={this.state.text}
                        onChange={(e) => {this.setState({text: e.target.value})}}
                        style={{width: '85%', borderRadius: 'inherit'}}
                        placeholder='请输入内容'
                    />
                    <Button
                        onClick={this.sendMessage}
                        style={{
                            width: '15%',
                            height: '100%',
                            padding: 0,
                            display: 'block',
                            float: 'right',
                            textAlign: 'center',
                            background: 'white',
                            color: 'dodgerblue'
                        }}
                    >发送</Button>
                </div>
            </div>
        );
        return (
            <FloatWindow
                top={this.props.top}
                float={this.props.float}
                tab={this.props.channelName}
                content={content}
                newArrived={this.props.chats.newArrived}
                onFoldChange={(newState) => {this.props.onFoldChange(newState)}}
            />
        )
    }
}
