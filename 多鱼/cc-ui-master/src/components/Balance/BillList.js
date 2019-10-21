import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import youjiantou from 'assets/个人中心/剪头.png';
import './Balance.css';
import { billType, billStatus, statusX,hhMMss } from '../../utils/appUtils'


class BillList extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
      isLoading: false
    }

    this.listData = []; //数据源
    this.len = null; //数据的个数
    this.count = null; //当前数据总页数
    this.pageSize = 15; //每次渲染的个数
    this.page = 1; //当前页数
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      if (nextProps.list) {
        if (this.page === 1) {
          this.listData = nextProps.list
        } else {
          this.listData = this.listData.concat(nextProps.list)
        }
      }
      this.len = nextProps.total ? parseInt(nextProps.total) : 0;
      this.count = Math.ceil(this.len / this.pageSize);
      this.setState({
        dataSource: this.ds.cloneWithRows(this.setData()),
        isLoading: false
      })
    }

    if (nextProps.transType !== this.props.transType) {
      this.page = 1
      this.props.dispatch({
        type: 'payment/getBillCheckList',
        payload: {
          pageSize: 15,
          pageNo: 1,
          transType: nextProps.transType,
          status: this.props.billStatus
        }
      });
      document.documentElement.scrollTop = 0
    }

    if (nextProps.billStatus !== this.props.billStatus) {
      this.page = 1
      this.props.dispatch({
        type: 'payment/getBillCheckList',
        payload: {
          pageSize: 15,
          pageNo: 1,
          transType: this.props.transType,
          status: nextProps.billStatus
        }
      });
      document.documentElement.scrollTop = 0
    }
  }
  setData() {
    let num = this.page * this.pageSize; //获取要渲染的个数
    if (num > this.len) num = this.len; //如果到最后一页 num 大于 len 那么num等于len 防止空数据

    let data = [];
    for (let i = 0; i < num; i++) {
      data.push(this.listData[i]);
    }
    return data;
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    if (this.page < this.count) {
      this.setData({ isLoading: true })
      this.page++;
      //分页查询
      this.props.dispatch({
        type: 'payment/getBillCheckList',
        payload: {
          pageSize: 15,
          pageNo: this.page,
          transType: this.props.transType,
          status: this.props.billStatus
        }
      });
    } else {
      return false;
    }
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
      const type = billType.find(v => v.value === rowData.transType)
      const statuss = billStatus.find(v => v.value === rowData.status)
      const statusx = statusX.find(v => v.value === rowData.transType)
      return (
        <div key={rowID} style={{
          color: 'black',
          width: '100vw',
          background:'white'
        }} onClickCapture={() => this.props.history.push({
          pathname: `/billDetails/${rowData.id}`,
          states: rowData
        })}>
          <div style={{
            margin: '0 auto',
            width: '95%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // borderBottom: index === -1 ? 'none' : '0.083rem solid #ECECED',
            height: '100%'
          }}>
            <div style={{ width: '42%' }}>
              <div style={{ margin: '7px 0' }}>{(type && type.label) || rowData.transType}</div>
              <div style={{ fontSize: '1.333rem', marginBottom: '0.833rem' }}>
                {hhMMss(rowData.transTime)}
              </div>
            </div>
            <div style={{ width: '48%', textAlign: 'right' }}>
              <div style={{ fontWeight:'500',fontSize: '17px', color: statusx && statusx.label === '-' ? '#FF8E8E' : '#eed3a5', margin: '7px 0' }}>￥{statusx && rowData.amount && statusx.label + rowData.amount.toFixed(2) + ''}</div>
              <div style={{ fontSize: '15px', marginBottom: '0.833rem',color:'#999999' }}>
                {(statuss && statuss.label) || rowData.status}
              </div>
            </div>
            <div style={{ width: '10%', textAlign: 'center' }}>
              <img alt='' src={youjiantou} style={{ width: '15px', marginTop: '0.833rem' }} />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div style={{ top: '55px', position: 'relative' }}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中' : '暂无数据'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          initialListSize={15}
          scrollRenderAheadDistance={500}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={10}
        />

      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { list, total } = state.payment
  return {
    loading: state.loading.models.payment,
    list, total
  };
}

export default connect(mapStateToProps)(BillList);
