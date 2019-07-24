import dva from 'dva';
import createLoading from 'dva-loading';
import logger from 'redux-logger';
const app = dva(
    process.env.NODE_ENV === "development" ? {
        onAction: logger,
    } : {}
);
app.use(createLoading());
app.router(require('./router').default);

app.start("#root");
export default app._store;

