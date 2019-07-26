import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch, Link } from 'dva/router';
import { LocaleProvider } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { getRouterData } from './common/router';
const { ConnectedRouter } = routerRedux;


class RouterConfig extends PureComponent {
    render() {
        const { history, app } = this.props;
        const routes = getRouterData(app);
        return <LocaleProvider locale={zh_CN}>
            <ConnectedRouter history={history}>
                <div>
                    <ul>
                        <li><Link to="/page3">Tacos</Link></li>
                        <li><Link to="/page2">Sandwiches</Link></li>
                        <li><Link to="/page1">page1</Link></li>
                        <li><Link to="/black/page2">page1</Link></li>
                    </ul>
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
            </ConnectedRouter>
        </LocaleProvider>
    }
}

export const RouteWithSubRoutes = (route) => (
    <Route exact={route.exact} path={route.path} render={props => (
        <route.component {...props} routes={route.routes} />
    )} />
)
export default RouterConfig;