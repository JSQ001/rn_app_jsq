import React from 'react';
import { connect } from 'dva';
import { ListView, Modal } from 'antd-mobile';
import './Personal.scss';

const alert = Modal.alert;

function getStatusDesc(orderStatus) {
  switch (orderStatus) {
    case "TO_PAY": return "待支付";
    case "TO_DELIVERY": return "待发货";
    case "TO_SIGN": return "待签收";
    case "FINISHED": return "已完成";
    case "CANCELED": return "已取消";
    default: return "执行中";
  }
}

class MyorderList extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }
    this.listData = []; //数据源
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.listData = nextProps.list ? nextProps.list : [];
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listData)
      })
    }
  }



  //跳转首页
  confirm = () => {
    this.props.history.push({ pathname: '/firstPage' })
  }

  //取消订单
  cancelOrder = (id) => {
    const { dispatch } = this.props
    alert('', '确定取消该订单么？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          dispatch({
            type: 'webshop/cancelOrder',
            payload: id,
            orderStatus: this.props.orderStatus
          })
        }
      },
    ])
  }

  //删除订单
  delOrder = (id) => {
    const { dispatch } = this.props
    alert('', '确定删除该订单么？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          dispatch({
            type: 'webshop/delOrder',
            payload: id,
            orderStatus: this.props.orderStatus
          })
        }
      },
    ])
  }


  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          // height: 8,
          borderTop: '0.083rem solid #ECECED',
          borderBottom: '0.083rem solid #ECECED',
        }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} className='myOrderList'>
          <div className='myOrderHeader'>
            <div style={{ width: '60%', float: 'left' }}>
              订单号：{rowData && rowData.orderNo ? rowData.orderNo : ''}
            </div>
            <div style={{ width: '40%', float: 'left', textAlign: 'right' }}>
              {getStatusDesc(rowData.orderStatus)}
            </div>
          </div>
          <div className='myOrderShop'>
            <div style={{ width: '50%', textAlign: 'center' }}>
              <img style={{ height: '100px', }} src={rowData && rowData.thumbUrl ? rowData.thumbUrl : ''} alt="商品图片" />
            </div>
            <div style={{ width: '50%' }}>
              <div style={{ fontSize: '14px' }}>{rowData.goodsName}</div>
              <div style={{ marginTop: '12px', fontSize: '12px' }}>
                <span>单价：{rowData && rowData.goodsPrice ? rowData.goodsPrice : ''}</span>
                <span style={{ marginLeft: '12px' }}>购买数量：{rowData && rowData.cnt ? rowData.cnt : ''}</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', textAlign: 'right', fontSize: '1.333rem' }}>
            合计：<span style={{ fontSize: '14px', color: '#e7be77' }}>{rowData && rowData.amount ? rowData.amount : ''}</span>
          </div>
          {rowData.orderStatus === 'TO_PAY' ?
            <div className='myOrderButton'>
              <div className='myOrderStartStyle' style={{ color: '#e7be77' }} onTouchEnd={() => this.cancelOrder(rowData.orderId)}>取消订单</div>
              <div className='myOrderStartStyle' style={{ color: '#e7be77' }} onTouchEnd={() => this.delOrder(rowData.orderId)}>删除订单</div>
              <div className='myOrderStartStyle' style={{ color: '#e7be77' }}>去支付</div>
            </div>
            : null
          }
          {rowData.orderStatus === 'FINISHED' || rowData.orderStatus === 'CANCELED' ?
            <div className='myOrderButton'>
              <div className='myOrderStartStyle' style={{ color: '#e7be77' }} onTouchEnd={() => this.delOrder(rowData.orderId)}>删除订单</div>
            </div>
            : null
          }
        </div>
      );
    };

    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={() => this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { list, total, pageNo } = state.webshop;
  return {
    loading: state.loading.models.application,
    list,
    total,
    pageNo
  };
}

export default connect(mapStateToProps)(MyorderList);
