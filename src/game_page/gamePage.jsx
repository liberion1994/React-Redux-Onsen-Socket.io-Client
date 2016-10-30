import React from "react";
import {Page, Button, Row, Col} from "react-onsenui";
import Navbar from "../common/navbar";

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chosen: false
        };

    }

    cardText() {
        let color = this.props.cardEntity.color;
        let number = this.props.cardEntity.number;
        switch (color) {
            case 'J':
                if (number == 0)
                    return <span style={{color: 'black'}}>小<br/>王</span>;
                else
                    return <span style={{color: 'red'}}>大<br/>王</span>;
            case '♥':
            case '♦':
                return <span style={{color: 'red'}}>{color}<br/>{number}</span>;
            default:
                return <span style={{color: 'black'}}>{color}<br/>{number}</span>;
        }
    }

    render() {
        let border = this.state.chosen ? '2px solid dodgerblue' : '2px solid white';
        let transX = 0;
        let transY = this.state.chosen ? -this.props.height/4 + 'vh' : 0;
        let transform = 'translate(' + transX + ',' + transY + ')';
        return (
            <div
                style={{
                    position: 'absolute',
                    left: this.props.left,
                    top: this.props.top,
                    background: 'white',
                    width: this.props.width + 'vh',
                    height: this.props.height + 'vh',
                    border: border,
                    borderRadius: '5px',
                    boxShadow: '1px 1px 3px #aaaaaa',
                    transform: transform,
                    transition: 'all .3s ease'
                }}
                onClick={() => {this.setState({chosen: !this.state.chosen})}}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        paddingLeft: '2px',
                        fontSize: this.props.height/6 + 'vh',
                        lineHeight: '100%'
                    }}
                >{this.cardText()}</div>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        fontSize: this.props.height/2 + 'vh',
                        lineHeight: this.props.height + 'vh'
                    }}
                >{this.props.cardEntity.color}</div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingLeft: '2px',
                        fontSize: this.props.height/6 + 'vh',
                        lineHeight: '100%',
                        transform: 'rotate(180deg)'
                    }}
                >{this.cardText()}</div>
            </div>
        )
    }
}

class TableArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {
        return (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '60%'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '3px',
                        fontSize: '2vh',
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'left',
                            padding: '3px'
                        }}
                    >
                        座位3
                    </div>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '3px'
                        }}
                    >
                        座位3
                    </div>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'right',
                            padding: '3px'
                        }}
                    >
                        座位3
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        fontSize: '2vh',
                        bottom: '3px',
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'left',
                            padding: '3px'
                        }}
                    >
                        座位3
                    </div>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '3px'
                        }}
                    >
                        座位3
                    </div>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'right',
                            padding: '3px'
                        }}
                    >
                        座位3
                    </div>
                </div>
            </div>
        )
    }
}

class OperationArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    width: '100%',
                    flex: 'none'
                }}>
                    <Row>
                        <Col width="25%" style={{padding: '5px'}}>
                            <Button style={{ textAlign: 'center', width: '100%'}} modifier="outline">准备</Button>
                        </Col>
                        <Col width="25%" style={{padding: '5px'}}>
                            <Button
                                style={{ textAlign: 'center', width: '100%'}}
                                modifier="outline"
                                onClick={() => {this.props.onLeaveTable()}}
                            >离开</Button>
                        </Col>
                        <Col width="25%" style={{padding: '5px'}}>
                            <Button style={{ textAlign: 'center', width: '100%'}} modifier="outline">互动</Button>
                        </Col>
                        <Col width="25%" style={{padding: '5px'}}>
                            <Button style={{ textAlign: 'center', width: '100%'}} modifier="outline">发言</Button>
                        </Col>
                    </Row>
                </div>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    flex: 1
                }}>
                    <Card
                        left='1vw'
                        top='4vh'
                        height={16}
                        width={11}
                        cardEntity={{number: 3, color: '♠'}}
                    />
                </div>

            </div>
        )
    }
}

export default class GamePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.onToolBarButtonClicked = this.onToolBarButtonClicked.bind(this);
    }

    onToolBarButtonClicked() {
        this.props.onToolBarButtonClicked();
    }

    componentDidMount() {
        this.props.loadData();
    }

    render() {
        return (
            <Page renderToolbar={() => <Navbar onToolBarButtonClicked={this.onToolBarButtonClicked} currentPageName='游戏' />}>
                <TableArea/>
                <OperationArea
                    onLeaveTable={() => {this.props.onLeaveTable()}}
                />
            </Page>
        )
    }
}
