import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import BasicLayout from "./layouts/BasicLayout";

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
          component: require('./components/name-list').default,
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
        component: require('./components/data-analysis').default,
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
    return (
      <div>
        <BasicLayout/>
      </div>
      );
  }
}

export default Container;
