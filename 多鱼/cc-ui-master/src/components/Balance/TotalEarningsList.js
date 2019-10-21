import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import youjiantou from 'assets/个人中心/剪头.png';
import { Link } from 'dva/router';
import './Balance.css';

class TotalEarningsList extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }

    this.listData = []; //数据源
    this.len = null; //数据的个数
    this.count = null; //当前数据总页数
    this.pageSize = 15; //每次渲染的个数
    this.page = 1; //当前页数
  }

  //初始化查询每日收益信息
  componentWillMount() {
    this.props.dispatch({
      type: 'cust/getDayProfitList',
      payload: {
        pageSize: 15,
        pageNo: 1,
        type: 'REPAY'
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.listData = nextProps.list ? this.listData.concat(nextProps.list) : this.listData;
      this.len = nextProps.total ? parseInt(nextProps.total) : 0;
      this.count = Math.ceil(this.len / this.pageSize);
      if (this.setData().length > 0) {
        this.setState({
          dataSource: this.ds.cloneWithRows(this.setData()),
          isLoading: false
        })
      }
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
      this.setState({ isLoading: 'true' })

      this.page++;
      //分页查询
      this.props.dispatch({
        type: 'cust/getDayProfitList',
        payload: {
          pageNo: this.page,
          pageSize: 15,
          type: 'REPAY'
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
          borderTop: '0.083rem solid #ECECED',
          borderBottom: '0.083rem solid #ECECED',
        }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      return (
        <Link to={`/todayEarning/${this.props.addr}/${this.props.addred}/${rowData.profitDate ? rowData.profitDate.split("-").join("") : ''}`}>
          <div key={rowID} style={{
            height: '4.167rem',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            background:'white'
          }}>
            <div style={{ width: '50%', fontSize: '1.333rem' }}>
              {rowData.profitDate}
            </div>
            <div style={{ width: '30%', fontSize: '17px', color:'#FF8E8E'}}>
              <img alt='' src={youjiantou} style={{
                width: '0.833rem',
                float: 'right',
                paddingTop: '0.083rem'
              }} />
              ￥<span style={{ float: 'right', marginRight: '0.833rem' ,fontSize:'18px',fontWeight:'700'}}>{rowData.revenueAmt && rowData.revenueAmt.toFixed(2)}</span>
            </div>
          </div>
        </Link>
      );
    };

    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ paddingTop: '2.5rem', textAlign: 'center' }}>
            {this.state.isLoading ? '加载中' : '已经到底了'}
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
  const { list, total, pageNo } = state.cust;
  return {
    loading: state.loading.models.cust,
    list,
    total,
    pageNo
  };
}

export default connect(mapStateToProps)(TotalEarningsList);
