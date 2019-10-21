import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/返回.png';
import { ListView, PullToRefresh } from 'antd-mobile';

import './Mermber.css';

class MembersGoodsList extends React.Component {


  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }

    this.listData = []; //数据源
    this.len = null; //数据的个数
    this.count = null; //当前数据总页数
    this.pageSize = 6; //每次渲染的个数
    this.page = 1; //当前页数
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'webshop/fetchGoods',
      payload: {
        pageNo: 1,
        pageSize: 6
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
      type: 'webshop/fetchGoods',
      payload: {
        pageNo: 1,
        pageSize: 6
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
        type: 'webshop/fetchGoods',
        payload: {
          pageNo: this.page,
          pageSize: 6
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
        <div key={rowID} className='prodcutList' style={{
          borderBottom: Number(rowID) === this.len - 1 ? 'none' : '0.083rem solid #00000012'
        }}>
          <img className='dalibao' alt='' src={rowData && rowData.thumbUrl ? rowData.thumbUrl : ''} />
          <div style={{ width: 'inherit', marginLeft: '4vw' }}>
            <p style={{ fontSize: '18px' }}>
              {rowData.goodsName}
            </p>
            <p style={{ fontSize: '12px' }}>
              {rowData.goodsDesc}
            </p>
          </div>

          <div className='prodcutListRight'>
            <p style={{ display: 'inline-block', marginBottom: '0.833rem' }}>
              <span style={{ fontSize: '25px', color: '#d89014f7' }}>
                {rowData.goodsPrice}
              </span>
              <span>元</span>
            </p>
            <div className='dianjigoumai' style={{ color: '#d89014f7', paddingTop: '6px', marginBottom: '1.167rem' }}
              onClick={() => this.props.history.push(`goodsDetails/${rowData.goodsId}/membersGoodsList`)}>
              点击购买
        </div>
          </div>
        </div>
      );
    };

    return (
      <div className='membersGood' style={{ paddingTop: '100px' }}>
        <div className='headStyle' style={{ height: '100px'}}>
          <div style={{
            height: '100%',
            width: '6.667rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '0px'
          }} onClickCapture={() => { this.props.history.goBack(-1) }}>
            <img alt='' src={back} style={{ width: '15px', zIndex: '200' }} />
          </div>
          <p style={{ fontSize: '1.167rem', display: 'inline-block' }}>商品列表</p>
        </div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中' : '已经没有商品了'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={6}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={10}
          initialListSize={6}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
        />

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

export default connect(mapStateToProps)(MembersGoodsList);
