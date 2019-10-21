import React from 'react';
import { connect } from 'dva';
import { ListView, ActivityIndicator } from 'antd-mobile';
import touxiang from 'assets/img/mine/WDHY_Tx@3x.png';
import dianhua from 'assets/img/mine/phone.png';
import './Personal.scss';
import { userLevel,hiddenName,hiddenPhone } from '../../utils/appUtils';





// const NUM_ROWS = 3;

class MyselfCommunityList extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }

    this.listData = []; //数据源
    this.len = null; //数据的个数
    this.count = null; //当前数据总页数
    this.pageSize = 10; //每次渲染的个数
    this.page = 1; //当前页数
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.listData = nextProps.list ? this.listData.concat(nextProps.list) : this.listData;
      this.len = nextProps.total ? parseInt(nextProps.total) : 0;
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


  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    //分页查询
    this.props.dispatch({
      type: 'cust/downStatById',
      payload: {
        pageNo: 1,
        pageSize: 10,
      }
    });

    this.page = 1; //当前页数
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.setData()),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }
    //如果page<count 那么我们让page++ 重新设置dataSource

    if (this.page < this.count) {
      this.page++;
      //分页查询
      this.props.dispatch({
        type: 'cust/downStatById',
        payload: {
          pageNo: this.page,
          pageSize: 10
        }
      });
    } else {
      return false;
    }
  }

  //跳转首页
  confirm = () => {
    this.props.history.push({ pathname: '/firstPage' })
  }

  //跳转商品详情页
  confirm1 = (id) => {
    this.props.history.push({ pathname: `/goodsDetails/${id}/membersGoodsList` })
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
        <div key={rowID} style={{
          height: '70px',
          marginTop: '0.833rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          background:'white'
        }}>
          <div style={{
            width: '18%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img alt='' src={touxiang} style={{ width: '40px' }} />
          </div>
          <div style={{
            width: '32%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            flexDirection: 'column',
            height: '100%'
          }} >
            <div style={{ height: '1.333rem' }}>
              <span>{rowData && rowData.userName ? hiddenName(rowData.userName) : '无'}</span>
              <span className='levelStyle' style={{ left: '4.167rem' }}>{rowData && rowData.userLeve ? userLevel(rowData.userLeve) : ''}</span>
            </div>
            <div style={{
              color: '#999999'
            }}>
              好友数量{rowData && rowData.teamCnt ? rowData.teamCnt : ''}人
            </div>
          </div>
          <div style={{
            width: '34%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
            flexDirection: 'column',
            marginRight: '0.833rem',
            height: '100%'
          }}>
            <div>
              {rowData && rowData.mobile ? hiddenPhone(rowData.mobile) : ''}
            </div>
            <div  style={{
              color: '#999999'
            }}>
              {rowData && rowData.registDate ? rowData.registDate : ''}
            </div>
          </div>
          <a style={{
            width: '16%',
          }} href={`tel:${rowData && rowData.mobile ? rowData.mobile : ''}`}>
            <img alt='' src={dianhua} style={{width: '4.167rem'}} />
          </a>
        </div >
      );
    };

    return (
      <div className="my-friend" style={{marginTop: 20}}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中' : '已经没有好友了'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={10}
        />
        <ActivityIndicator
          toast
          text="加载中..."
          animating={!!this.props.loading}
        />
      </div >
    );
  };
}

const mapStateToProps = (state) => {
  const { list, total, pageNo, teamCnt } = state.cust;

  return {
    loading: state.loading.models.cust,
    list, total, pageNo, teamCnt
  };
}

export default connect(mapStateToProps)(MyselfCommunityList);
