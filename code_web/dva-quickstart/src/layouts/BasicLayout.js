/**
 * Created by jsq on 2019/7/23.
 */
import React, { createElement} from 'react';
import { connect } from 'dva';
import {Layout} from 'antd';
import SideMenu from '../components/sideMenu'
// import moment from 'moment';
import '../styles/dashboard.scss'
// import { Link } from 'dva/router';
import service from "../services";
const {Content } = Layout;


/*const menuList = [
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
];*/

@connect((state) => ({menu: state.menu.currentMenu}))
class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
      data: [],
    };
  }

  componentDidMount(){
    this.getInfo().catch(e=>console.log(e))
  }

  getInfo = async ()=>{
    const {data} = await service.getInfo();
    this.setState({
      data: data.data.map(item=>({...item.profile,npi: item.npi}))
    });
  };


  select = (params)=>{
    console.log(params)
  };

  handleOpenChange =(value)=>{
    console.log(value)
  };

  render(){

    const { menu: {component}} = this.props;
    const {data} = this.state;
    return (
      <div className="dashboard-container">
        <Layout>
          <SideMenu/>
          <Layout>
            <Content style={{padding: '20px 20px'}}>
              {
               component && createElement(component,{data})
              }
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default BasicLayout
