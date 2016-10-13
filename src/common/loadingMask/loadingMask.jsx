import React from "react";
import {ProgressCircular} from "react-onsenui";
import './loadingMask.css';

export default class LoadingMask extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div
                className="mask-animate"
                style={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 9998
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#e0e0e0',
                        opacity: '0.6'
                    }}
                >
                </div>
                <div style={{
                    left: '50%',
                    top: '50%',
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    zIndex: 9999,
                    opacity: '1'
                }}>
                    <ProgressCircular indeterminate/>
                    <div>网络有点差，加载中</div>
                </div>
            </div>
        )
    }
}
