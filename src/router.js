import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { getRouterData } from './common/router';
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
    const routes = getRouterData();
    return (
        <LocaleProvider locale={zh_CN}>
            <ConnectedRouter history={history}>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    )
}
export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        <route.component {...props} routes={route.routes} />
    )} />
)
export default RouterConfig;