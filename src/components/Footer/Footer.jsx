import React, {Component} from 'react';
import './Footer.less'
export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='footer-wrap'>Footer 组件</div>
        )
    }
}
