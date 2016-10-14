import React from "react";
import {Page, Toolbar, Input, Carousel, CarouselItem, Button} from "react-onsenui";
import ons from "onsenui"

import './loginPage.css'

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            usernameR: null,
            passwordR: null,
            repeatPassword: null
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin() {
        if (this.state.username && this.state.username != '' && this.state.password && this.state.password != '')
            this.props.requestLogin(this.state.username, this.state.password);
        else
            ons.notification.alert({message: '用户名/密码不能为空', title: '出错了'});
    }

    handleRegister() {
        if (this.state.usernameR && this.state.usernameR != '' && this.state.passwordR && this.state.passwordR != '') {
            if (this.state.repeatPassword != this.state.passwordR)
                ons.notification.alert({message: '两次输入的密码不一致', title: '出错了'});
            else
                this.props.requestRegister(this.state.usernameR, this.state.passwordR);
        } else {
            ons.notification.alert({message: '用户名/密码不能为空', title: '出错了'});
        }
    }

    render() {
        return (
            <div
                style={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
                className="login-animate">
            <Page
                style={{textAlign: 'center'}}
                renderToolbar={() =>
                    <Toolbar>
                        <div className='center'>
                            登录/注册
                        </div>
                    </Toolbar>
                }
            >
                <Carousel
                    fullscreen
                    swipeable
                    autoScroll
                >
                    <CarouselItem>
                        <div className="to-right-page">
                            <i className="fa fa-angle-double-right"/>
                        </div>
                        <h2 style={{marginBottom: '5vh'}}>登录</h2>
                        <Input
                            style={{width: "60%", padding: '2vh 0'}}
                            value={this.state.username}
                            onChange={(e) => {this.setState({username: e.target.value})}}
                            modifier="underbar"
                            float
                            placeholder="用户名"
                        />
                        <Input
                            style={{width: "60%", padding: '2vh 0'}}
                            value={this.state.password}
                            onChange={(e) => {this.setState({password: e.target.value})}}
                            modifier="underbar"
                            type="password"
                            float
                            placeholder="密码"
                        />
                        <Button
                            modifier="outline"
                            style={{width: "60%", marginTop: '5vh'}}
                            onClick={this.handleLogin}
                        >登录</Button>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="to-left-page">
                            <i className="fa fa-angle-double-left"/>
                        </div>
                        <h2 style={{marginBottom: '5vh'}}>注册</h2>
                        <Input
                            style={{width: "60%", padding: '2vh 0'}}
                            value={this.state.usernameR}
                            onChange={(e) => {this.setState({usernameR: e.target.value})}}
                            modifier="underbar"
                            float
                            placeholder="用户名"
                        />
                        <Input
                            style={{width: "60%", padding: '2vh 0'}}
                            value={this.state.passwordR}
                            onChange={(e) => {this.setState({passwordR: e.target.value})}}
                            modifier="underbar"
                            type="password"
                            float
                            placeholder="密码"
                        />
                        <Input
                            style={{width: "60%", padding: '2vh 0'}}
                            value={this.state.repeatPassword}
                            onChange={(e) => {this.setState({repeatPassword: e.target.value})}}
                            modifier="underbar"
                            type="password"
                            float
                            placeholder="重复密码"
                        />
                        <Button
                            modifier="outline"
                            style={{width: "60%", marginTop: '5vh'}}
                            onClick={this.handleRegister}
                        >注册</Button>
                    </CarouselItem>
                </Carousel>
            </Page>
            </div>
        )
    }
}
