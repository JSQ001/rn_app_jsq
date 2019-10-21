import React from 'react';
import { connect } from 'dva';
import { Tabs, Badge } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './Personal.scss';
import MyorderList from './MyorderList';
import { getOrderStatus } from '../../utils/appUtils';
import PageHeader from "../common/layout/page-header";


const tabs = [
  { title: <Badge >全部</Badge>, id: '1' },
  { title: <Badge >待付款</Badge>, id: '2' },
  { title: <Badge >待发货</Badge>, id: '3' },
  { title: <Badge >待收货</Badge>, id: '4' },
  { title: <Badge >已完成</Badge>, id: '5' },
];

class MyselfOrder extends React.Component {


  componentWillMount() {
    this.props.dispatch({
      type: 'webshop/getCurrUserOrderList',
      payload: {
        pageNo: 1,
        pageSize: 1000,
        orderStatus: ''
      }
    });
  }


  //查询所有的订单信息
  fetchOrderInfo = (value) => {
    this.props.dispatch({
      type: 'webshop/getCurrUserOrderList',
      payload: {
        pageNo: 1,
        pageSize: 1000,
        orderStatus: getOrderStatus(value)
      }
    });
  }




  render() {
    return (
      <div >
        <PageHeader title='我的订单'/>
        <div>
          <Tabs tabs={tabs}
            initialPage={0}
            onTabClick={(tab, index) => this.fetchOrderInfo(index)}
          >
            <div >
              <MyorderList data={this.props.list ? this.props.list : ''} pageNo={this.props.pageNo ? this.props.pageNo : ''} orderStatus='' />
            </div>
            <div >
              <MyorderList data={this.props.list ? this.props.list : ''} pageNo={this.props.pageNo ? this.props.pageNo : ''} orderStatus='TO_PAY' />
            </div>
            <div >
              <MyorderList data={this.props.list ? this.props.list : ''} pageNo={this.props.pageNo ? this.props.pageNo : ''} orderStatus='TO_DELIVERY' />
            </div>
            <div >
              <MyorderList data={this.props.list ? this.props.list : ''} pageNo={this.props.pageNo ? this.props.pageNo : ''} orderStatus='TO_SIGN' />
            </div>
            <div >
              <MyorderList data={this.props.list ? this.props.list : ''} pageNo={this.props.pageNo ? this.props.pageNo : ''} orderStatus='FINISHED' />
            </div>
          </Tabs>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { list, total, pageNo } = state.webshop;
  return {
    loading: state.loading.models.webshop,
    list,
    total,
    pageNo
  };
}

export default connect(mapStateToProps)(MyselfOrder);
