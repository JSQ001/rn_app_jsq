import React from 'react';
import { connect } from 'dva';
import { ListView, Toast,PullToRefresh,Modal} from 'antd-mobile';
import '../PersonalCenter/Personal.scss';
import './Tickets.css';
import {yyyyMMdd,securityType,userLevel,cmpDate} from '../../utils/appUtils.js';

const alert = Modal.alert;
class TicketsModal extends React.Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds
    }

    this.listData = []; //数据源
    this.len = null; //数据的个数
    this.count = null; //当前数据总页数
    this.pageSize = 6; //每次渲染的个数
    this.page = 1; //当前页数
  }

  //查询我的地址信息
  componentWillMount() {
    // const type = this.state.ticketType;
    // if(type==='LEVEL_PROP'){
    //   ticketType = 'LEVEL_PROP';
    // }else if(type === '/addRepaymentPlan'){
    //   ticketType = 'REPAY_PROP';
    // }
    this.props.dispatch({
      type: 'cust/getUserSec',
      payload: {
        securityType: this.props.ticketType,
        pageNo: 1,
        pageSize: 6
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.securityList !== this.props.securityList) {
      this.listData = nextProps.securityList ? this.listData.concat(nextProps.securityList) : this.listData;
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
      type: 'cust/getUserSec',
      payload: {
        securityType: this.props.ticketType,
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
        type: 'cust/getUserSec',
        payload: {
          securityType: this.props.ticketType,
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
      const isUsed = rowData&&rowData.useStatus === 2?"Y":"N";
      const validDate = rowData&&rowData.expireDate?rowData.expireDate:new Date();
      const inTimeFlag = rowData&&cmpDate(yyyyMMdd(new Date()),yyyyMMdd(validDate))>0?"N":"Y";
      const showDesc = rowData&&isUsed ==='Y'?"已使用":rowData&&inTimeFlag==="N"?"已过期":"有效";
      const desc = rowData&&rowData.securityType==='LEVEL_USE'?rowData.targetLevel==='1'?"等级直接晋升一级":"直接提升至"+userLevel(rowData.targetLevel)
                    :rowData&&rowData.securityType==='BAL_USE'?"直接领取"+rowData.deductAmt+"元，可提现"
                    :rowData&&rowData.securityType==='REPAY_PROP'?"计划满"+rowData.reachAmt+"元，可抵用"+rowData.reduceAmt+"元"
                    :rowData&&rowData.securityType==='LEVEL_PROP'?"购买会员直接抵用"+rowData.deductAmt+"元"
                    :"";
      return (
        <div key={rowID} style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '95vw',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          height: '100px',
          borderRadius:'0.833rem'
        }}>

          <div className = {isUsed==="Y"||inTimeFlag==="N"?"bg2":"bg"} >
            <div style={{width:'100vw'}}>
              <div className="first">
              {rowData?
                rowData.securityType==='LEVEL_USE'?
                  rowData.targetLevel==='1'?'升一级'
                  :userLevel(rowData.targetLevel)
                :<div><span style={{fontSize:'1.333rem',fontWeight:'500'}}>￥</span>{rowData.reduceAmt?rowData.reduceAmt:rowData.deductAmt}</div>
              : ''
              }
              </div>
              <div className="second">{rowData?securityType(rowData.securityType).substr(2):''}</div>
            </div>
          </div>
          <div style={{ display: 'flex', width: '70%', height: '100px',background:'white',float:'left',color: isUsed==="Y"||inTimeFlag==="N"?'#999999':'black' }}>
            <div style={{width:'100vw'}}>
              <div className="rFirst">
                <div className="rF-des">
                  <span>{rowData.securityName}</span>
                  <span className="rF-flag" style={{background:isUsed==="Y"||inTimeFlag==="N"?'#999999':'#A7D87F'}}>{showDesc}</span>
                </div>
                <div className="rF-cnt">
                  {desc}
                </div>
              </div>
              <div className="rSecond">
                <div className="validTime">有效期至：{yyyyMMdd(validDate)}</div>
                {isUsed==="Y"||inTimeFlag==="N"?"":
                <div className='useBlock'><div className="useAtOnce"
                    onTouchEndCapture={
                      () => {
                        if(rowData&&(rowData.securityType==='LEVEL_USE'
                        ||rowData.securityType==='BAL_USE')){
                          alert('', '确认使用该券？', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确认', onPress: () => this.useTicket(rowData.id) },
                          ])
                        }else if (!this.props.ticketType||this.props.ticketType === ''||this.props.ticketType === null) {
                          Toast.info('该券需要在实际场景中使用', 2)
                        }else if(this.props.repayAmt&&this.props.repayAmt<rowData.reachAmt){
                          Toast.info('达不到该券使用要求', 2)
                        }else if(rowData&&(rowData.securityType==='LEVEL_PROP')){
                          this.props.callback(rowData)
                        }
                        else {
                          this.props.callback(rowData.id)
                        }
                      }
                    }>立即使用</div></div>}

              </div>
            </div>
          </div>

        </div>
      );
    };

    return (
      <div style={{ background:'#F6F6F6' }}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中' : '已经没有卡券了'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={6}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={6}
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
  const { securityList, total, pageNo } = state.cust;
  return {
    loading: state.loading.models.application,
    securityList,
    total,
    pageNo
  };
}

export default connect(mapStateToProps)(TicketsModal);
