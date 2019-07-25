import React from 'react';
import {Spin} from 'antd'
import {routerRedux, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Dashboard from './components/dashboard';
import Container from './container'
import dynamic from 'dva/dynamic';
const { ConnectedRouter } = routerRedux;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="" />;
});

function RouterConfig({ history, app }) {
 // console.log(app)
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/products" exact component={Products} />
        <Route path="/" render={props =><Container {...props}/>}/>
        <Route path="/data-analysis" component={Products} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
