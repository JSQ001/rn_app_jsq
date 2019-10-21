import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/rtn-white.png';
import { ListView, PullToRefresh } from 'antd-mobile';

import './Mermber.css';
import { Link } from 'dva/router';


class MemberGoodsChoose extends React.Component {

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

  //页面初始化商品列表查询
  componentWillMount() {
    this.props.dispatch({
      type: 'webshop/fetchVipGoods',
      payload: {
        pageNo: 0,
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
      type: 'webshop/fetchVipGoods',
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

    if (this.page < this.count) {
      this.page++;
      //分页查询
      this.props.dispatch({
        type: 'webshop/fetchVipGoods',
        payload: {
          pageNo: this.page,
          pageSize: 6
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

        <div className='prodcutList' style={{
          borderBottom: Number(rowID) === this.len - 1 ? 'none' : '0.083rem solid #00000012'
        }}>
          <div className='dalibaoBg'>
            <img className='dalibao' alt='' src={rowData.thumbUrl} />
          </div>
          <div style={{ width: 'inherit', marginLeft: '4vw' }}>
            <p style={{ fontSize: '18px' }}>
              {rowData.goodsName}
            </p>
            <p style={{ fontSize: '12px' }}>
              {rowData.goodsDesc}
            </p>
          </div>

          <div className='prodcutListRight'>
            <p style={{ display: 'inline-block', marginBottom: '0.833rem' }}/>
            <Link to={`/vipGoodsDetails/${rowData.goodsId}/membersGoodsList`}>
              <div className='dianjigoumai'>
                选择礼物
            </div>
            </Link>
          </div>
        </div>
      );
    };

    return (
      <div style={{ paddingBottom: '65px',background:'#F6F6F6'}}>
        <div className='goodsBanner' style={{height: '245px'}}>
            <div style={{
              height: '100px',
              width: '6.667rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: '0px'
            }} onClickCapture={() => { this.props.history.goBack(-1) }}>
              <img alt='' src={back} style={{ width: '26px', zIndex: '200' }} />
            </div>
            <div style={{ marginTop:'90px',marginLeft:'2.5rem',lineHeight:'25px',color: 'white', fontSize: '1.167rem', display: 'inline-block' }}>请挑选</div><br/>
            <div style={{ marginLeft:'2.5rem',lineHeight:'2.5rem',fontWeight:'600',color: 'white', fontSize: '1.833rem', display: 'inline-block' }}>专属您的礼品</div>
        </div>
        <ListView
          style={{width: '95vw',margin:'-66px auto'}}
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

export default connect(mapStateToProps)(MemberGoodsChoose);
