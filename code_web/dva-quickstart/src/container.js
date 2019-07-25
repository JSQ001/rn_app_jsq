import React, { Component } from 'react';
import { Modal } from "antd"
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Router,routerRedux } from 'dva/router';
import Products from './routes/Products';
import SiderMenu from "./components/sideMenu/SideMenu";
import service from './services'
import BasicLayout from "./layouts/BasicLayout";
import dashboard from "./components/dashboard";

// import axios from 'axios';

@connect((state) => ({...state}))
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routerData: {},
      activeKey: '',
      selectKey: '',
      messages: {},
      openKey: '',
    };
    this.group = {};
    this.functionGroup = {};
    this.pageMap = {};
    this.refMap = {};
    this.applicationIds = {};
    this.ws = null;
  }

  // 页面加载 sso antfin
  componentDidMount() {
    this.reloadRoutes();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.onRouterChange();
    }
  }

  componentWillUnmount() {
  }


  reloadRoutes = () => {
    const component = this.getComponent();
    this.setCurrentMenu(component)
  };

  onRouterChange = () => {
    const { dispatch } = this.props;
    let path = window.location.hash.replace('#', '');
    if (path === '/') {
      dispatch(
        routerRedux.push({
          pathname: '/dashboard',
        })
      );
      return;
    }
    const component = this.getComponent(path);
    this.setState({
      activeKey: component.routeKey,
      selectKey: component.functionId,
      openKey: component.contentId,
    });
    this.setCurrentMenu(component);
  };

  setCurrentMenu = component => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/setCurrentMenu',
      payload: component,
    });
  };


  getComponent = (path = window.location.hash.replace('#', '') ) => {
    switch (path) {
      case '/':case '/name-list':default:
        return {
          routeKey: 'default',
          component: require('./components/' + 'name-list').default,
          params: {
            match: {},
            getRef: ref => {
              this.getRef(ref, "");
            },
          },
          name: "default",
          pathname: "123",
        };
    case '/data-analysis':
      return {
        routeKey: 'default',
        component: require('./components/' + 'data-analysis').default,
        params: {
          match: {},
          getRef: ref => {
            this.getRef(ref, "");
          },
        },
        name: "default",
        pathname: "123",
      }
    }
  };

  getRef = (ref, key) => {
    this.refMap = { [key]: ref };
  };


  render() {
    // const { languages: { local } } = this.props;
    const { loading, activeKey, selectKey, panes, messages, local, openKey } = this.state;

    return (
      <div>
        <BasicLayout/>
      </div>
      );
  }
}

export default Container;
