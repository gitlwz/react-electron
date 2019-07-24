import React, { createElement } from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const modelNotExisted = (app, model) =>
    // eslint-disable-next-line
    !app._models.some(({ namespace }) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    });
const dynamicWrapper = (app, models, component) => {
    models.forEach(model => {
        if (modelNotExisted(app, model)) {
            // eslint-disable-next-line
            app.model(require(`../models/${model}`).default);
        }
    });
    if (component.toString().indexOf('.then(') < 0) {
        return props => {
            return createElement(component().default, {
                ...props
            });
        };
    }
    return Loadable({
        loader: () => {
            return component().then(raw => {
                const Component = raw.default || raw;
                return props =>
                    createElement(Component, {
                        ...props
                    });
            });
        },
        loading: ({ error, pastDelay }) => {
            if (pastDelay) {
                return <Spin size="large" className="global-spin" />;
            } else {
                return null;
            }
        },
    });
};

export const getRouterData = app => ([
    {
        path: "/page",
        component: dynamicWrapper(app, [], () => import("../layouts/BasicLayout.js")),
        routes: [
            {
                path: "/page/page2",
                component: dynamicWrapper(app, [], () => import("../routes/Page2.js")),
            },
            {
                path: "/page/page1",
                component: dynamicWrapper(app, [], () => import("../routes/Page1.js"))
            }
        ]
    }
])