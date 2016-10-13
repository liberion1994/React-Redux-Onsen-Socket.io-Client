import React from "react";


import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class HidableItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: true
        };

    }

    componentDidMount() {
        const height = document.getElementById('detail').clientHeight;
        this.setState({height: height, show: false});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show});
    }

    render() {
        let style = this.state.show ?
        {height: this.state.height, transition: 'height .3s ease-in', overflow: 'hidden'} :
        {height: '0', transition: 'height .3s ease-out', overflow: 'hidden'};

        var detail = <div id="detail" style={style}>{this.props.content}</div>;
        return (detail)
    }
}
