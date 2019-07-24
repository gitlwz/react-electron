import React, { Component } from 'react'
import { RouteWithSubRoutes } from "../router";
import { Link } from 'dva/router';
export class Page1 extends Component {

    componentDidMount = () => {
        console.log("&&&&&&&", this.props)
    }
    render() {
        return (
            <div>
                page1
                <ul>
                    <li><Link to="/page">Tacos</Link></li>
                    <li><Link to="/page/page2">Sandwiches</Link></li>
                    <li><Link to="/page1">page1</Link></li>
                </ul>
                {this.props.routes && this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </div>
        )
    }
}

export default Page1
