/**
 * Created by jsq on 2019/7/23.
 */
import React from 'react';
import { connect } from 'dva';
import {Layout, Menu} from 'antd';
// import moment from 'moment';
//import '../../styles/dashboard.scss'
import '../../styles/side-menu.scss'
import { Link } from 'dva/router';

const { Sider, } = Layout;
const { SubMenu } = Menu;


class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: window.location.hash.replace('#', ''),
      menuList: [
        {
          id: 'name-list', name: '医生名单', path: 'name-list'
        },
        {
          id: 'data-analysis', name: '分析', path: 'data-analysis'
        },
      ]
    };
  }

  componentDidMount() {
  }

  UNSAFE_componentWillReceiveProps(nextprops){
    // console.log(nextprops,this.props)
  }

  /*
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SideMenu
   */
  getMenuItemPath = item => {
    const { currentItem } = this.state;
    const { path,target, name, id } = item;

    return (
      <Link
        to={path}
        target={target}
        replace={false}
        onClick={
          () => {
            this.setState({currentItem: id})
          }
        }
      >
        <div style={{
          textAlign: 'center',
          width: '80%',
          borderRadius: '20px',
          background: id === currentItem ?"#404040" : "#EDEDED"
        }}>
          {name}
        </div>;
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon && (item.level === 1 || !item.level) ? (
                <span>
                  <span>{item.name}</span>
                </span>
              ) : (item.name)
            }
            key={item.id}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.id}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };

  /**
   * 获得菜单子节点
   * @memberof SideMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }

    return menusData.filter(item => item.name).map(item => {
      return this.getSubMenuOrItem(item);
    }).filter(item => item);
  };

  select = (params)=>{
    console.log(params)
  };

  handleOpenChange =(value)=>{
    console.log(value)
  };

  render(){

    const { menuList} = this.state;

    return (
      <Sider
        trigger={null}
        collapsible
        breakpoint="lg"
        width={220}
        className='menu-side'
        style={{background: '#D8D8D8'}}
      >
        <div className="logo" key="logo">
          <Link to="/dashboard">
            <img src="" alt="logo" />
            <h1 style={{ textAlign: 'center', color:  '#1890FF' }}>Demo</h1>
          </Link>
        </div>
        <div className="menu-container">

          <div style={{ padding: '0', width: '100%', overflowY: 'auto', height: 'calc(100vh - 116px)', overflowX: 'hidden' }}>
            <Menu
              style={{
                background: '#D8D8D8'
              }}
              key="Menu"
              mode="inline"
              onOpenChange={this.handleOpenChange}
              onSelect={this.select}
            >
              {this.getNavMenuItems(menuList)}
            </Menu>
          </div>
        </div>
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(SideMenu);
