import React, {Component} from 'react';
import './Header.less'
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div class="header_wrap">Header 组件</div>
        )
    }
}
