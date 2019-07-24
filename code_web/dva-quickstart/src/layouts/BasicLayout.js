/**
 * Created by jsq on 2019/7/23.
 */
import React, { createElement} from 'react';
import { connect } from 'dva';
import {Layout, Menu} from 'antd';
import SideMenu from '../components/sideMenu'
// import moment from 'moment';
import '../styles/dashboard.scss'
import { Link } from 'dva/router';
import menu from "../models/menu";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


const menuList = [
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard/name',
      },
    ],
  },
  {
    path: '/userinfo',
    children: [
      {
        path: '/userinfo/:id',
        children: [
          {
            path: '/userinfo/:id/info',
          },
        ],
      },
    ],
  },
];

@connect((state) => ({menu: state.menu.currentMenu}))
class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
    };
  }

  componentDidMount() {
  }

  UNSAFE_componentWillReceiveProps(nextprops){
    console.log(nextprops,this.props)
  }


  select = (params)=>{
    console.log(params)
  };

  handleOpenChange =(value)=>{
    console.log(value)
  };

  render(){

    const { menu: {component}} = this.props;
    return (
      <div className="dashboard-container">
        <Layout>
          <SideMenu/>
          <Layout>
            <Content style={{padding: '20px 20px'}}>
              {
               component && createElement(component,{})
              }
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default BasicLayout
