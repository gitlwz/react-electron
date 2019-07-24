import React, { Component } from 'react'
import { Link } from 'dva/router';
export class Page1 extends Component {

    componentDidMount = () => {
        console.log("&&&&&&&", this.props)
    }
    render() {
        return (
            <div>
                page2
                <ul>
                    <li><Link to="/page">Tacos</Link></li>
                    <li><Link to="/page/page2">Sandwiches</Link></li>
                    <li><Link to="/page1">page1</Link></li>
                </ul>
            </div>
        )
    }
}

export default Page1
