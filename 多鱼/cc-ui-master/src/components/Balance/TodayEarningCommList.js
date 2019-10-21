import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import './Balance.css';

function timeGet(time) {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ');
}
class TodayEarningCommList extends React.Component {

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


  //初始化查询每日返佣信息
  componentWillMount() {
    this.props.dispatch({
      type: 'cust/getSingleDayComm',
      payload: {
        pageSize: 15,
        pageNo: 1,
        id: this.props.id
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listComm !== this.props.listComm) {
      this.listData = nextProps.listComm ? this.listData.concat(nextProps.listComm) : this.listData;
      this.len = nextProps.totalComm ? parseInt(nextProps.totalComm) : 0;
      this.count = Math.ceil(this.len / this.pageSize);
      if (this.setData().length > 0) {
        this.setState({
          dataSource: this.ds.cloneWithRows(this.setData())
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
      this.page++;
      //分页查询
      this.props.dispatch({
        type: 'cust/getSingleDayComm',
        payload: {
          pageNo: this.page,
          pageSize: 15,
          id: this.props.id
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
      return (
        // <div key={rowID} style={{ height: '6.667rem', marginTop: '0.833rem' }}>
        //   <div style={{ width: '30%', fontSize: '1.333rem', paddingTop: '15px', paddingLeft: '15px' }}>
        //     {rowData.phoneNo}
        //   </div>
        //   <div style={{ fontSize: '1.333rem', width: '50%', marginLeft: '15px', marginTop: '12px' }} >
        //     {rowData.date}
        //   </div>
        //   <div style={{ width: '28%', marginLeft: '270px', fontSize: '1.333rem', marginTop: '-2.5rem' }}>
        //     ￥{rowData.money}
        //   </div>
        // </div>

        <div key={rowID} style={{
          height: '4.167rem',
          color: 'black',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100vw',
          background:'white'
        }}>
          <div style={{ width: '50%', fontSize: '1.333rem' }}>
            <p style={{
              margin: 0,
              paddingBottom: '5px'
            }}>{rowData.mobile}</p>
            {rowData.revenueDate && timeGet(rowData.revenueDate)}
          </div>
          <div style={{ width: '30%', fontSize: '17px', color:'#FF8E8E' }}>
            ￥<span style={{ float: 'right', marginRight: '0.833rem' ,fontSize:'18px',fontWeight:'700'}}>{rowData.revenueAmt && rowData.revenueAmt.toFixed(2)}</span>
          </div>
        </div>
      );
    };

    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
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
  const { listComm, totalComm, pageNoComm } = state.cust;
  return {
    loading: state.loading.models.application,
    listComm,
    totalComm,
    pageNoComm
  };
}

export default connect(mapStateToProps)(TodayEarningCommList);
